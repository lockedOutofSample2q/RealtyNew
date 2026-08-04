"use client";

import { useEffect } from "react";

export default function ChecklistInteractive() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.item'));
    const boxes = Array.from(document.querySelectorAll<HTMLElement>('.box'));
    const countEl = document.getElementById('done');
    const totalEl = document.getElementById('total');
    const fillEl = document.getElementById('fill');
    const toast = document.getElementById('toast');

    if (!items.length || !boxes.length || !countEl || !totalEl || !fillEl || !toast) {
      return;
    }

    function encode() {
      const bits = boxes.map(b => b.getAttribute('aria-checked') === 'true' ? '1' : '0').join('');
      return parseInt(bits, 2).toString(36);
    }

    function decode(h: string) {
      const n = parseInt(h, 36);
      if (isNaN(n)) return;
      let bits = n.toString(2);
      while (bits.length < boxes.length) bits = '0' + bits;
      boxes.forEach((b, i) => {
        const state = bits[i] === '1';
        b.setAttribute('aria-checked', state ? 'true' : 'false');
        items[i]?.classList.toggle('done', state);
      });
    }

    function update() {
      const vis = items.filter(it => !it.classList.contains('hide'));
      const checkedVis = vis.filter(it => {
        const b = it.querySelector('.box');
        return b && b.getAttribute('aria-checked') === 'true';
      }).length;

      countEl!.textContent = String(checkedVis);
      totalEl!.textContent = 'of ' + vis.length + ' verified';
      fillEl!.style.width = (vis.length ? Math.round((checkedVis / vis.length) * 100) : 0) + '%';
    }

    function getActiveFilter() {
      const activeChip = chips.find(c => c.getAttribute('aria-pressed') === 'true');
      return activeChip?.dataset.filter || 'all';
    }

    function syncHash() {
      const filter = getActiveFilter();
      const filterParam = filter !== 'all' ? `&f=${filter}` : '';
      history.replaceState(null, '', '#s=' + encode() + filterParam);
    }

    let toastTimer: ReturnType<typeof setTimeout>;
    function say(msg: string) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('up');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toast.classList.remove('up'); }, 2400);
    }

    // Attach checkbox handlers
    const cleanups: Array<() => void> = [];

    boxes.forEach((b, i) => {
      const toggle = () => {
        const state = b.getAttribute('aria-checked') === 'true';
        b.setAttribute('aria-checked', state ? 'false' : 'true');
        items[i]?.classList.toggle('done', !state);
        update();
        syncHash();
      };

      const handleClick = () => toggle();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      };

      b.addEventListener('click', handleClick);
      b.addEventListener('keydown', handleKeyDown);

      cleanups.push(() => {
        b.removeEventListener('click', handleClick);
        b.removeEventListener('keydown', handleKeyDown);
      });
    });

    function applyFilter(filterKey: string, shouldSyncHash = true) {
      chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
      const targetChip = chips.find(c => (c.dataset.filter || 'all') === filterKey) || chips.find(c => c.dataset.filter === 'all');
      if (targetChip) {
        targetChip.setAttribute('aria-pressed', 'true');
      }

      items.forEach(it => {
        const tags = it.dataset.tags || '';
        it.classList.toggle('hide', filterKey !== 'all' && tags.indexOf(filterKey) === -1);
      });

      document.querySelectorAll<HTMLElement>('.stage').forEach(st => {
        const any = Array.from(st.querySelectorAll<HTMLElement>('.item'))
          .some(it => !it.classList.contains('hide'));
        st.style.display = any ? '' : 'none';
      });

      update();
      if (shouldSyncHash) {
        syncHash();
      }
    }

    // Attach filter chip handlers
    const chips = Array.from(document.querySelectorAll<HTMLElement>('.chip'));
    chips.forEach(chip => {
      const handleChipClick = () => {
        const filter = chip.dataset.filter || 'all';
        applyFilter(filter, true);
      };

      chip.addEventListener('click', handleChipClick);
      cleanups.push(() => chip.removeEventListener('click', handleChipClick));
    });

    // Actions
    const printBtn = document.getElementById('print');
    if (printBtn) {
      const handlePrint = () => window.print();
      printBtn.addEventListener('click', handlePrint);
      cleanups.push(() => printBtn.removeEventListener('click', handlePrint));
    }

    const shareBtn = document.getElementById('share');
    if (shareBtn) {
      const handleShare = () => {
        const filter = getActiveFilter();
        const filterParam = filter !== 'all' ? `&f=${filter}` : '';
        const url = location.origin + location.pathname + '#s=' + encode() + filterParam;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            say('Link copied. Send it to your lawyer to share your progress.');
          }).catch(() => {
            say(url);
          });
        } else {
          say(url);
        }
      };
      shareBtn.addEventListener('click', handleShare);
      cleanups.push(() => shareBtn.removeEventListener('click', handleShare));
    }

    const ITEM_COORDS = [
      // Page 1 (index 0)
      { pageIndex: 0, y: 598.44 }, // 1. Title or conveyance deed
      { pageIndex: 0, y: 519.64 }, // 2. Mother deed
      { pageIndex: 0, y: 458.54 }, // 3. Encumbrance certificate
      { pageIndex: 0, y: 379.74 }, // 4. Land use classification and CLU
      { pageIndex: 0, y: 300.94 }, // 5. Cancellation and dispute status
      { pageIndex: 0, y: 167.04 }, // 6. Property tax receipts

      // Page 2 (index 1)
      { pageIndex: 1, y: 781.54 }, // 7. Electricity clearance
      { pageIndex: 1, y: 720.44 }, // 8. Maintenance society dues
      { pageIndex: 1, y: 669.44 }, // 9. Allotment letter
      { pageIndex: 1, y: 600.74 }, // 10. Approved building plan
      { pageIndex: 1, y: 521.94 }, // 11. RERA Punjab registration
      { pageIndex: 1, y: 453.24 }, // 12. Carpet, built-up area
      { pageIndex: 1, y: 347.14 }, // 13. Completion certificate
      { pageIndex: 1, y: 313.84 }, // 14. Occupancy certificate (OC)
      { pageIndex: 1, y: 225.44 }, // 15. NOCs and no-due certificates
      { pageIndex: 1, y: 174.44 }, // 16. Permission to sell

      // Page 3 (index 2)
      { pageIndex: 2, y: 733.44 }, // 17. Agreement to sell
      { pageIndex: 2, y: 662.74 }, // 18. Sale deed draft
      { pageIndex: 2, y: 583.94 }, // 19. Stamp duty calculation
      { pageIndex: 2, y: 513.24 }, // 20. Sale deed executed
      { pageIndex: 2, y: 397.04 }, // 21. Mutation applied for
      { pageIndex: 2, y: 335.94 }, // 22. Authority transfer initiated
      { pageIndex: 2, y: 274.84 }, // 23. Electricity transferred
      { pageIndex: 2, y: 241.54 }, // 24. Separate property tax ID
      { pageIndex: 2, y: 190.54 }, // 25. Originals secured
    ];

    // Download PDF Action with dynamic ticked state
    const downloadBtns = Array.from(document.querySelectorAll<HTMLElement>('a[href*="RHMC-Property-Document-Checklist.pdf"], .btn-tool'));
    downloadBtns.forEach((btn) => {
      if (btn.tagName === 'A' && btn.getAttribute('href')?.includes('.pdf')) {
        const handleDownload = async (e: Event) => {
          e.preventDefault();
          say('Preparing your customized checklist PDF...');

          try {
            const { PDFDocument, PDFName, PDFString, StandardFonts, rgb } = await import('pdf-lib');
            const res = await fetch('/downloads/RHMC-Property-Document-Checklist.pdf');
            const pdfBytes = await res.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const addLinkToPage = (p: any, rect: [number, number, number, number], url: string) => {
              const linkAnnotation = pdfDoc.context.obj({
                Type: 'Annot',
                Subtype: 'Link',
                Rect: rect,
                Border: [0, 0, 0],
                A: {
                  Type: 'Action',
                  S: 'URI',
                  URI: PDFString.of(url),
                },
              });
              const linkRef = pdfDoc.context.register(linkAnnotation);
              const annots = p.node.get(PDFName.of('Annot')) || p.node.get(PDFName.of('Annots'));
              if (annots) {
                const annotsArray = pdfDoc.context.lookup(annots);
                if (annotsArray && 'push' in annotsArray) {
                  (annotsArray as any).push(linkRef);
                } else {
                  p.node.set(PDFName.of('Annots'), pdfDoc.context.obj([linkRef]));
                }
              } else {
                p.node.set(PDFName.of('Annots'), pdfDoc.context.obj([linkRef]));
              }
            };

            // Stamp website logo and header/footer
            try {
              const logoRes = await fetch('/assets/logo.png');
              const logoBytes = await logoRes.arrayBuffer();
              const logoImage = await pdfDoc.embedPng(logoBytes);
              const pages = pdfDoc.getPages();

              pages.forEach((page, index) => {
                const { width, height } = page.getSize();
                const targetLogoWidth = 54;
                const logoScale = targetLogoWidth / logoImage.width;
                const logoWidth = logoImage.width * logoScale;
                const logoHeight = logoImage.height * logoScale;

                page.drawRectangle({
                  x: 0,
                  y: height - 40,
                  width: width,
                  height: 40,
                  color: rgb(1, 1, 1),
                });

                page.drawImage(logoImage, {
                  x: 40,
                  y: height - 6 - logoHeight,
                  width: logoWidth,
                  height: logoHeight,
                });

                const tagLine = 'Investing in your dream property?';
                const phonePart = 'Call / WhatsApp: +91 78146 13916';
                const bulletPart = '  •  ';
                const sitePart = 'realtyconsultants.in';
                const phoneLine = phonePart + bulletPart + sitePart;

                const tagTextWidth = regularFont.widthOfTextAtSize(tagLine, 7.5);
                const phoneTextWidth = boldFont.widthOfTextAtSize(phoneLine, 7.5);
                const phonePartWidth = boldFont.widthOfTextAtSize(phonePart, 7.5);
                const sitePartWidth = boldFont.widthOfTextAtSize(sitePart, 7.5);

                page.drawText(tagLine, {
                  x: width - 40 - tagTextWidth,
                  y: height - 16,
                  size: 7.5,
                  font: regularFont,
                  color: rgb(0.35, 0.35, 0.35),
                });

                page.drawText(phoneLine, {
                  x: width - 40 - phoneTextWidth,
                  y: height - 27,
                  size: 7.5,
                  font: boldFont,
                  color: rgb(0.79, 0.66, 0.30),
                });

                page.drawLine({
                  start: { x: 40, y: height - 37 },
                  end: { x: width - 40, y: height - 37 },
                  thickness: 0.5,
                  color: rgb(0.85, 0.85, 0.85),
                });

                // Add Clickable Links in Header
                const phoneXStart = width - 40 - phoneTextWidth;
                const phoneXEnd = phoneXStart + phonePartWidth;
                addLinkToPage(page, [phoneXStart, height - 31, phoneXEnd, height - 19], 'https://wa.me/917814613916');

                const siteXEnd = width - 40;
                const siteXStart = siteXEnd - sitePartWidth;
                addLinkToPage(page, [siteXStart, height - 31, siteXEnd, height - 19], 'https://realtyconsultants.in');

                page.drawRectangle({
                  x: 0,
                  y: 0,
                  width: width,
                  height: 36,
                  color: rgb(1, 1, 1),
                });

                page.drawLine({
                  start: { x: 40, y: 36 },
                  end: { x: width - 40, y: 36 },
                  thickness: 0.5,
                  color: rgb(0.85, 0.85, 0.85),
                });

                const footerContact = 'Realty Holding & Management Consultants  •  Phase 8A, Mohali  •  +91 78146 13916';
                const pageNumText = `Page ${index + 1} of ${pages.length}`;

                page.drawText(footerContact, {
                  x: 40,
                  y: 18,
                  size: 7.5,
                  font: regularFont,
                  color: rgb(0.4, 0.4, 0.4),
                });

                const pageNumWidth = regularFont.widthOfTextAtSize(pageNumText, 7.5);
                page.drawText(pageNumText, {
                  x: width - 40 - pageNumWidth,
                  y: 18,
                  size: 7.5,
                  font: regularFont,
                  color: rgb(0.4, 0.4, 0.4),
                });

                // Add Clickable Link in Footer
                const footerTextWidth = regularFont.widthOfTextAtSize(footerContact, 7.5);
                addLinkToPage(page, [40, 12, 40 + footerTextWidth, 26], 'https://wa.me/917814613916');
              });
            } catch (err) {
              console.warn('Logo stamp notice:', err);
            }

            const pages = pdfDoc.getPages();
            boxes.forEach((b, i) => {
              if (b.getAttribute('aria-checked') === 'true' && ITEM_COORDS[i]) {
                const coord = ITEM_COORDS[i];
                const page = pages[coord.pageIndex];

                page.drawRectangle({
                  x: 41.7,
                  y: coord.y,
                  width: 9,
                  height: 9,
                  color: rgb(0.12, 0.53, 0.28),
                });

                page.drawText('v', {
                  x: 43.1,
                  y: coord.y + 1.8,
                  size: 7,
                  font: boldFont,
                  color: rgb(1, 1, 1),
                });
              }
            });

            const modifiedPdf = await pdfDoc.save();
            const blob = new Blob([modifiedPdf.buffer as ArrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'RHMC-Property-Document-Checklist.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            say('Checklist PDF downloaded with your verified items!');
          } catch (err) {
            console.error('PDF download error:', err);
            window.location.href = '/downloads/RHMC-Property-Document-Checklist.pdf';
          }
        };

        btn.addEventListener('click', handleDownload);
        cleanups.push(() => btn.removeEventListener('click', handleDownload));
      }
    });

    const resetBtn = document.getElementById('reset');
    if (resetBtn) {
      const handleReset = () => {
        boxes.forEach((b, i) => {
          b.setAttribute('aria-checked', 'false');
          items[i]?.classList.remove('done');
        });
        applyFilter('all', true);
        say('Checklist reset.');
      };
      resetBtn.addEventListener('click', handleReset);
      cleanups.push(() => resetBtn.removeEventListener('click', handleReset));
    }

    // Initial load: decode checked items FIRST, then set active filter tab
    const initialHash = location.hash;
    const mState = initialHash.match(/s=([0-9a-z]+)/i);
    if (mState) {
      decode(mState[1]);
    }

    const mFilter = initialHash.match(/f=([a-z]+)/i);
    if (mFilter) {
      applyFilter(mFilter[1].toLowerCase(), false);
    } else {
      update();
    }

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, []);

  return null;
}

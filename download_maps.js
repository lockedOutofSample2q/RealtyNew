const fs = require('fs');
const https = require('https');
const path = require('path');

const maps = [
    { name: 'Master_Plan_SAS_Nagar.pdf', url: 'https://gmada.gov.in/sites/default/files/master_plan_of_sas_nagar.pdf' },
    { name: 'SAS_Nagar_Planning_Area.pdf', url: 'https://gmada.gov.in/sites/default/files/sas_nagar_planning_area.pdf' },
    { name: 'Master_Plan_Mullanpur.pdf', url: 'https://gmada.gov.in/sites/default/files/master_plan_of_mullanpur.pdf' },
    { name: 'Master_Plan_Zirakpur.pdf', url: 'https://gmada.gov.in/sites/default/files/master_plan_of_zirakpur.pdf' },
    { name: 'Master_Plan_Kharar.pdf', url: 'https://gmada.gov.in/sites/default/files/master_plan_of_kharar.pdf' },
    { name: 'GMADA_Regional_Plan.pdf', url: 'https://gmada.gov.in/sites/default/files/2023-12/GMADA%20Regional%20Plan.pdf' },
    { name: 'IT_City_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/IT-City-Map.pdf' },
    { name: 'IT_City_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1891305253.pdf' },
    { name: 'AeroCity_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/185253919.pdf' },
    { name: 'AeroCity_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1267199751.pdf' },
    { name: 'EcoCity1_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1491921265.pdf' },
    { name: 'EcoCity1_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1017438323.pdf' },
    { name: 'EcoCity2_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1785864852.pdf' },
    { name: 'EcoCity2_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1196203014.pdf' },
    { name: 'Sector52_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/884575366.pdf' },
    { name: 'Sector53_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/499399857.pdf' },
    { name: 'Sector54_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/587573705.pdf' },
    { name: 'Sector54_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/505733646.pdf' },
    { name: 'Sector55_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1416743534.pdf' },
    { name: 'Sector55_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/325334631.pdf' },
    { name: 'Sector56_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1385543466.pdf' },
    { name: 'Sector57_58_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1539563689.pdf' },
    { name: 'Sector57_58_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/9774710.pdf' },
    { name: 'Sector59_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/791494804.pdf' },
    { name: 'Sector60_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1835654325.pdf' },
    { name: 'Sector61_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/377804446.pdf' },
    { name: 'Sector62_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/492973240.pdf' },
    { name: 'Sector63_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1098100631.pdf' },
    { name: 'Sector64_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/934625908.pdf' },
    { name: 'Sector65_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1170339508.pdf' },
    { name: 'Sector65_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/832545165.pdf' },
    { name: 'Sector66_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/296947850.pdf' },
    { name: 'Sector67_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/2028285397.pdf' },
    { name: 'Sector69_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/520150632.pdf' },
    { name: 'Sector70_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/870379273.pdf' },
    { name: 'Sector71_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/205155834.pdf' },
    { name: 'Sector73_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1093835239.pdf' },
    { name: 'Sector77_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/2034226534.pdf' },
    { name: 'Sector77_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/686429285.pdf' },
    { name: 'Sector78_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/896796662.pdf' },
    { name: 'Sector80_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/326917380.pdf' },
    { name: 'Sector88_89_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1631096174.pdf' },
    { name: 'Sector88_89_Zoning.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/1403049010.pdf' },
    { name: 'Sector79_City_Garden_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/CITY%20GARDEN%20FINAL%20LAYOUT%2031-03-2022_c.pdf' },
    { name: 'Sector66A_82_83_Industrial.pdf', url: 'https://gmada.gov.in/sites/default/files/2020-01/Sector%2066%20A%2C%2082%2C%2083.pdf' },
    { name: 'Sector74A_Lok_Awas_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/2022-05/Lok%20Awas%20Sector%2074-A.pdf' },
    { name: 'MediCity_Layout.pdf', url: 'https://gmada.gov.in/sites/default/files/inline-images/668581179.pdf' }
];

const downloadDir = path.join(__dirname, 'maps', 'mohali');

async function downloadFile(url, dest) {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
        console.log(`Skipping: ${path.basename(dest)} (Already exists)`);
        return;
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${path.basename(dest)}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function downloadAll() {
    console.log(`Starting download of ${maps.length} files...`);
    for (const map of maps) {
        const dest = path.join(downloadDir, map.name);
        try {
            await downloadFile(map.url, dest);
        } catch (error) {
            console.error(`Error downloading ${map.name}: ${error.message}`);
        }
    }
    console.log('All downloads completed.');
}

downloadAll();

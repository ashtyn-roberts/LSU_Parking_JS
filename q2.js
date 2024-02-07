const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.lsu.edu/parking/availability.php';

axios.get(url)
.then(response =>{
    if (response.status === 200){
        console.log('Successful')
        const html = response.data;
        const $ = cheerio.load(html);

        const tableSelector = 'table.ou_6col';
        const totalSpacesColumn = 2;
        const fourPmColumn= 6;

        $(tableSelector).find('tr:gt(0)').each((index, row) =>{
            const totalSpaces = parseInt($(row).find(`td:eq(${totalSpacesColumn})`).text(), 10);
            const fourPmPercentage = parseInt($(row).find(`td:eq(${fourPmColumn})`).text().replace('% Full', ''), 10);

            if(!isNaN(totalSpaces) && !isNaN(fourPmPercentage)){
                const occupiedSpaces = (fourPmPercentage / 100) * totalSpaces;
                const availableSpaces = totalSpaces - occupiedSpaces;

                console.log(`Row ${index +1}: Total Spaces: ${totalSpaces}, Occupied Spaces: ${occupiedSpaces}, Available Spaces: ${availableSpaces}`);
            } else{
                console.error('This is a non integer row!');
            }
        });
    }
})
.catch(error =>{
    console.error('Error during the request:', error.message);
});
let XLSX = require("xlsx");

class Reader{
    read_from_excel(sheetname, filepath){
        let workbook = XLSX.readFile(filepath);
        let worksheet = workbook.Sheets[sheetname];

        return XLSX.utils.sheet_to_json(worksheet);
    }
}

module.exports = new Reader();
const Blob = require("cross-blob");
const date = require('date-and-time');

const csv = class CsvDownloadService {

    header = [];
    rows = [];

    filename = "csv";

    constructor(filename) {
        this.filename = filename;
    }

    setName(filename) {
        this.filename = filename;
    }

    setHeader = (headerList) => {
        let headerString = "";
        headerList.map((cell, index) => {
            headerString += cell;
            if (index < headerList.length) {
                headerString += ",";
            }
        });
        this.header = [headerString];
    }

    addRow = (record) => {
        let row = "";
        record.map((cell, index) => {
            row += cell;
            if (index < record.length) {
                row += ",";
            }
        });
        this.rows.push(row);
    }


    download = async (ctx) => {

        const data = this.header.concat(this.rows).join("\n");

        let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        let blob = new Blob([bom, data], { type: 'text/csv' });
        let text = await blob.text();

        const now = new Date();
        const filename = this.filename + "_" + date.format(now, 'YYYYMMDD_HHmm') + ".csv";
        ctx.response.set("Content-disposition", 'attachment; filename=' + filename);
        ctx.response.set("Content-Type", "text/csv; charset=windows-1252;");
        ctx.body = text;
        return;
    }
}

module.exports = csv;
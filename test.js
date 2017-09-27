const parseXlsx = require('excel');
const fs = require('fs');

const config = {
    excel_path: './translations.xlsx', //must is .xlsx file
    languages: [
        {
            language: 'it', //italy
            excel_volume: 1,
            localizable_string_path: './localizable/it.lproj/Localizable.strings',
            storyboard_string_path: './storyboard/it.lproj/Main.strings',
        },
        {
            language: 'de',
            excel_volume: 2,
            localizable_string_path: './localizable/de.lproj/Localizable.strings',
            storyboard_string_path: './storyboard/de.lproj/Main.strings',
        },
        {
            language: 'fr',
            excel_volume: 3,
            localizable_string_path: './localizable/fr.lproj/Localizable.strings',
            storyboard_string_path: './storyboard/fr.lproj/Main.strings',
        },
        {
            language: 'es',
            excel_volume: 4,
            localizable_string_path: './localizable/es.lproj/Localizable.strings',
            storyboard_string_path: './storyboard/es.lproj/Main.strings',
        },
    ]
};

parseXlsx(config.excel_path, function (err, data) {
    if (err) throw err;

    for (let language of config.languages) {
        language.localizable_strings = fs.readFileSync(language.localizable_string_path, 'utf8');
        language.storyboard_strings = fs.readFileSync(language.storyboard_string_path, 'utf8')

        // data is an array of arrays
        for (item of data) {
            const re =new RegExp(item[0]+'";\\n','g'); // re为/^\d+bl$/gim
            const replace_string = `${item[language.excel_volume]}";\n`;

            console.log(re,replace_string);
            language.localizable_strings = language.localizable_strings.replace(re, replace_string);
            language.storyboard_strings = language.storyboard_strings.replace(re, replace_string);
        }

        fs.writeFileSync(language.localizable_string_path, language.localizable_strings, 'utf8');
        fs.writeFileSync(language.storyboard_string_path, language.storyboard_strings, 'utf8');
    }
});



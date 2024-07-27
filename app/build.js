const { execSync } = require('child_process');
const fs = require('fs');
const pluginName = 'alumni-dataverse-client';
const pluginFileName = `${pluginName}.php`;
const pluginsFolder = `..\\plugin`;
const destination = `${pluginsFolder}\\${pluginName}`;
const pluginFilePath = `${destination}\\${pluginName}.php`

// Remove the dist folder in the plugin file if its present. Doesn't care if it's not.
fs.rmSync(`${destination}\\dist`, { recursive: true, force: true });
fs.rmSync(`${pluginsFolder}\\${pluginName}.zip`, { force: true })

// Run the build command
execSync('ng build --configuration production', { encoding: 'utf-8', stdio: 'inherit' });

// Move the bundle from the `/app` folder to the plugin's folder
execSync(`move .\\dist ${destination}`)

// copy the js and css file names to an array
distFilenames = fs.readdirSync(`${destination}\\dist\\alumni-dataverse-client\\browser`);
scriptsAndStyleFiles = distFilenames.filter(file => file.endsWith('.js') || file.endsWith('.css'));

// replace the js and css file names in the php file contents
const pluginFileContents = fs.readFileSync(`${pluginFilePath}`, 'utf8');

const updateLine = (line, name) => {
    const matchedLinePart = line.match(/(?<=client\/).*?(?=\')/gs).toString();
    const matchedFileName = scriptsAndStyleFiles.find(file => file.includes(name));
    return line.replace(matchedLinePart, matchedFileName);
}

const updatedFileContentArray = pluginFileContents.split(/\r?\n/).map(line => {
    switch (true) {
        case line.includes('wp_enqueue_style( \'ng_styles'):
            return updateLine(line, 'styles');
        case line.includes('wp_register_script( \'ng_main'):
            return updateLine(line, 'main');
        case line.includes('wp_register_script( \'ng_polyfills'):
            return updateLine(line, 'polyfills');
        default:
            return line;
    }
});
const updatedFileContents = updatedFileContentArray.join('\n');

// write the new names to the php file
fs.writeFileSync(`${pluginFilePath}`, updatedFileContents);

//zip the plugin
execSync(`tar.exe -a -c -f ${pluginsFolder}\\${pluginName}.zip -C ${destination} *`)

console.log(`*************** ${pluginFileName} updated! ***************`)
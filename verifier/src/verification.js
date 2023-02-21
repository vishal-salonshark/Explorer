
const solc = require('solc');
const Web3 = require('web3');
const fs = require('fs');
const chalk = require('chalk');

var _verified ;

async function verifier(answers, provider) {
    var web3 = new Web3(new Web3.providers.HttpProvider(provider));
    let solc_version = answers['solc_version'];
    let file_name = answers['file_name'];
    let contract_address = answers['contract_address'];
    let is_optimized = (answers['is_optimized'] === "1") ? true : false;
    let solidity_code = answers['solidity_code']
    let file_folder = answers['file_folder'];

    if (!fs.existsSync('code')) {
        fs.mkdirSync('code');
        console.log("Code folder created");
    }
    var file_path = file_folder + '/code/' + contract_address + '_' +file_name;
    console.log(file_path)
    fs.writeFileSync(file_path, solidity_code);
    console.log('File being compiled and compared: ' + file_name);
    var input = fs.readFileSync(file_path, 'utf8');
    // console.log(input)

    var bytecode_from_compiler;
    var bytecode_from_blockchain;
    console.log('==========================================')
    console.log('Compiler Version: ' + solc_version)
    console.log(chalk.bold.green('Compiling in progress, ') + ' Please be patient...')

    solc.loadRemoteVersion(solc_version, function (err, solc_specific) {
        if (err) {
            console.log('Solc failed to loaded' + err);
        }

        var input_json = {
            language: "Solidity",
            sources:
                { file: { "content": input } },
            settings: {
                optimizer: {
                    enabled: is_optimized,
                    runs: 200
                },
                outputSelection: {
                    "*": {
                        "*": ["*"]
                    }
                }
            }

        }
        var output = JSON.parse(solc_specific.compile(JSON.stringify(input_json)));
        // console.log(output)
        let solc_minor = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1))
        let solc_patch = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1))
        

        try {
            var bytecode = output["contracts"][''][file_name.slice(0, file_name.length - 4)]['evm']['deployedBytecode']['object']
            // console.log(bytecode);
        } catch (err) {
            try {
                console.log("Multi contract file detected. Compiling the main contract: " + file_name.slice(0, file_name.length - 4))
                var bytecode = output["contracts"]["file"][file_name.slice(0, file_name.length - 4)]['evm']['deployedBytecode']['object']
                // console.log(bytecode);
                
            } catch (error) {
                console.log('Please Check Compiler Version!!');
                console.log(error);
            }
        }

        if ((solc_minor >= 4) && (solc_patch >= 7)) {


            if (solc_minor >= 4 && solc_patch >= 22) {
                var starting_point = bytecode.lastIndexOf('6080604052');

            } else if (solc_patch < 4 && solc_patch >= 7) {

                var starting_point = bytecode.lastIndexOf('6060604052');
            }
            console.log()

            var ending_point = bytecode.search('a165627a7a72305820');

            bytecode_from_compiler = '0x' + bytecode.slice(starting_point, ending_point);
            console.log()
            console.log('==========================================')
            console.log('Finish compiling contract using solc compiler...');
            testify_with_blockchain(solc_version);
        }
        else {
            bytecode_from_compiler = '0x' + bytecode;
            console.log()
            console.log('==========================================')
            console.log('Finishing compiling contract using solc compiler...');
            testify_with_blockchain(solc_version);
        }
    });

    function  testify_with_blockchain(solc_version) {
        web3.eth.getCode(contract_address)
            .then(output => {
                // Define the regular expression to match the constructor data
                var constructorDataRegex = /a26[\w]+6/;
                    
                // Extract the constructor data from the bytecode
    let constructorData = output.match(constructorDataRegex);
    
    // Remove the constructor data from the bytecode
    let strippedBytecode = output.replace(constructorDataRegex, '');
                console.log ()
                // console.log (constructorData[0])
                // console.log ()
                // console.log (strippedBytecode)

                let solc_minor = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1))
                let solc_patch = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1))
               

                if ((solc_minor >= 4) && (solc_patch >= 7)) {


                    if (solc_minor >= 4 && solc_patch >= 22) {
                        var starting_point = output.lastIndexOf('6080604052');
        
                    } else if (solc_patch < 4 && solc_patch >= 7) {
        
                        var starting_point = output.lastIndexOf('6060604052');
                    }
                    console.log()
        
                    var ending_point = output.search('a165627a7a72305820');
        
                    bytecode_from_blockchain = output.slice(starting_point, ending_point);
                  
                }else {
                    bytecode_from_blockchain = output;
                }

                // bytecode_from_blockchain = String(bytecode_from_blockchain.replace(constructorDataRegex, ''));
                // bytecode_from_compiler = String(bytecode_from_compiler.replace(constructorDataRegex, ''));
    
                console.log('bytecode from blockchain: ' + bytecode_from_blockchain);
                console.log();
                console.log('bytecode from compiler: ' + bytecode_from_compiler);
                console.log();
                _verified = (bytecode_from_blockchain === bytecode_from_compiler)? true : false;
                console.log(`Bytecode ${_verified ? "Verified!!" : "doesn't match!!"}`);
            });
        }
        console.log(_verified)
        return (await _verified)
    };

module.exports = {verifier}
function separateConstructorData(bytecode) {
    // Define the regular expression to match the constructor data
    let constructorDataRegex = /a26[\w]+6/;
    
    // Extract the constructor data from the bytecode
    let constructorData = bytecode.match(constructorDataRegex);
    
    // Remove the constructor data from the bytecode
    let strippedBytecode = bytecode.replace(constructorDataRegex, '');
    
    // Return the stripped bytecode and the constructor data
    return {
      strippedBytecode: strippedBytecode,
      constructorData: constructorData[0]
    };
  }
  
  console.log(separateConstructorData('0x6080604052348015600f57600080fd5b506004361060325760003560e01c80630c55699c14603757806360fe47b1146053575b600080fd5b603d607e565b6040518082815260200191505060405180910390f35b607c60048036036020811015606757600080fd5b81019080803590602001909291905050506084565b005b60005481565b806000819055505056fea265627a7a723058203d0c2087a1233b5bff017c62b5a8bccd694c4652d0628153d8e864ad306c334164736f6c634300050a003'))
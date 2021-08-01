const { uploadFile } = require("../../helpers/helpers");
const fs = require('fs')
const path = require('path')

describe('Test file upload',()=>{
    test('file upload works',async()=>{
        let filepath = path.resolve(__dirname, '../samples/sample-image.jpg')
        const sampleFile = fs.readFileSync(filepath)
        let { publicURL } = await uploadFile('posts', 'public', sampleFile, 'jpg')
        console.log(publicURL); 
        expect(publicURL).toBeDefined(); 
    })
})  

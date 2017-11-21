var request = require('request');

var brands = [
    {code: '054', name: '3-star'},
    {code: '178', name: 'Agco Allis'},
    {code: '125', name: 'Agrale'},
    {code: '175', name: 'Agrinar'},
    {code: '002', name: 'Alfa Romeo'},
    {code: '220', name: 'Apache Solis'},
    {code: '004', name: 'Asia'},
    {code: '003', name: 'Audi'},
    {code: '055', name: 'Belavtomaz'},
    {code: '056', name: 'Blac'},
    {code: '005', name: 'Bmw'},
    {code: '171', name: 'Case'},
    {code: '180', name: 'Challenger'},
    {code: '192', name: 'Chery'},
    {code: '006', name: 'Chevrolet'},
    {code: '007', name: 'Chrysler'},
    {code: '008', name: 'Citroen'},
    {code: '182', name: 'Claas'},
    {code: '009', name: 'Dacia'},
    {code: '010', name: 'Daewoo'},
    {code: '011', name: 'Daihatsu'},
    {code: '208', name: 'Deutz - Fahr'},
    {code: '057', name: 'Deutz Agrale'},
    {code: '219', name: 'Dfm'},
    {code: '058', name: 'Dimex'},
    {code: '012', name: 'Dodge'},
    {code: '184', name: 'Don Roque'},
    {code: '059', name: 'F.e.r.e.s.a.'},
    {code: '013', name: 'Ferrari'},
    {code: '014', name: 'Fiat'},
    {code: '015', name: 'Ford'},
    {code: '224', name: 'Foton'},
    {code: '069', name: 'Galloper'},
    {code: '060', name: 'Gaz'},
    {code: '226', name: 'Geely'},
    {code: '181', name: 'Gleaner'},
    {code: '070', name: 'Heibao'},
    {code: '221', name: 'Hino'},
    {code: '016', name: 'Honda'},
    {code: '017', name: 'Hyundai'},
    {code: '061', name: 'International'},
    {code: '018', name: 'Isuzu'},
    {code: '019', name: 'Iveco'},
    {code: '020', name: 'Jaguar'},
    {code: '021', name: 'Jeep'},
    {code: '218', name: 'Jmc'},
    {code: '172', name: 'John Deere'},
    {code: '022', name: 'Kia'},
    {code: '115', name: 'Lada'},
    {code: '025', name: 'Land Rover'},
    {code: '024', name: 'Lexus'},
    {code: '222', name: 'Lifan'},
    {code: '123', name: 'Mack'},
    {code: '026', name: 'Maserati'},
    {code: '173', name: 'Massey Ferguson'},
    {code: '027', name: 'Mazda'},
    {code: '028', name: 'Mercedes Benz'},
    {code: '047', name: 'Mg'},
    {code: '068', name: 'Mini'},
    {code: '029', name: 'Mitsubishi'},
    {code: '063', name: 'Nakai'},
    {code: '170', name: 'New Holland'},
    {code: '030', name: 'Nissan'},
    {code: '067', name: 'Opel'},
    {code: '177', name: 'Pauny'},
    {code: '031', name: 'Peugeot'},
    {code: '032', name: 'Porsche'},
    {code: '033', name: 'Proton'},
    {code: '217', name: 'Ram'},
    {code: '034', name: 'Renault'},
    {code: '035', name: 'Rover'},
    {code: '036', name: 'Saab'},
    {code: '064', name: 'Sanxing'},
    {code: '065', name: 'Scania'},
    {code: '037', name: 'Seat'},
    {code: '133', name: 'Smart'},
    {code: '072', name: 'Space'},
    {code: '039', name: 'Ssangyong'},
    {code: '040', name: 'Subaru'},
    {code: '041', name: 'Suzuki'},
    {code: '042', name: 'Tata'},
    {code: '043', name: 'Toyota'},
    {code: '212', name: 'Valtra'},
    {code: '183', name: 'Vassalli'},
    {code: '134', name: 'Volare'},
    {code: '044', name: 'Volkswagen'},
    {code: '045', name: 'Volvo'},
    {code: '066', name: 'Wuling'}
]

for(brand of brands) {
    let options = {
        url: 'http://www.acara.org.ar/javascript/rsss.php', 
        formData: {marID: brand.code}, 
        encoding: 'binary'
    } 
    
    let brandCode = brand.code;
    let brandName = brand.name;
    request.post(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        
        let modelLines = body.split(/\\n/);
        for(modelLine of modelLines) {
            let [modelCode, modelName] = modelLine.split(/\\t/)
            
            let versionOptions = {
                url: 'http://www.acara.org.ar/javascript/rsss.php', 
                formData: {marID: brandCode, modID: modelCode},
                encoding: 'binary'
            } 
            
            request.post(versionOptions, function optionalCallback(err2, httpResponse2, body2) {
                if (err2) {
                    return console.error('upload failed:', err2);
                }
        
                let versionLines = body2.split(/\\n/);
                for(versionLine of versionLines) {
                    let [versioCode, versionName] = versionLine.split(/\\t/)
                    
                    console.log(brandName + ';' + modelName + ';' + versionName);
                }
            });
        }
    });
}


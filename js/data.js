/**
 * Shopping cart data.
 */
(function(app) {
    var items = [
            {   "id": 0,
                "name": "Exoplode",
                "description": "Est culpa veniam sint aliquip. Anim esse et et ullamco aute ullamco voluptate irure fugiat exercitation velit cupidatat. Ipsum deserunt cupidatat eu laborum ut mollit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 927
            },
            {
                "id": 1,
                "name": "Crustatia",
                "description": "Elit aliqua quis proident aliqua est dolor. Enim voluptate irure excepteur anim aliquip amet laborum sint quis consequat. Exercitation irure mollit Lorem pariatur reprehenderit quis.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 781
            },
            {
                "id": 2,
                "name": "Medesign",
                "description": "Amet do adipisicing magna sint consectetur dolore qui nisi sint sunt. Proident magna laborum irure sint anim tempor deserunt aliqua. Amet in aliqua et officia mollit culpa sunt est elit laborum nulla minim dolore. Do incididunt ea duis qui ea in elit cillum in. Nisi velit aliquip irure duis ut non. Incididunt anim exercitation aliquip excepteur. Sint ipsum aliquip adipisicing ipsum eiusmod commodo cupidatat aliqua tempor tempor deserunt.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 672
            },
            {
                "id": 3,
                "name": "Puria",
                "description": "Officia nostrud reprehenderit eiusmod fugiat enim veniam laboris nulla deserunt tempor duis nisi. Excepteur anim enim eiusmod aute enim magna irure fugiat officia. Ea ut consequat do deserunt pariatur dolor excepteur cillum velit. Esse dolore nostrud laboris sint proident in sint ad adipisicing ea. Dolor adipisicing incididunt mollit proident enim fugiat nulla officia id. Id eiusmod ex aliqua occaecat est magna sit non veniam do exercitation. Nostrud minim magna non cillum tempor ipsum enim mollit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 985
            },
            {
                "id": 4,
                "name": "Pharmex",
                "description": "Occaecat consequat dolor commodo enim elit anim ea aliqua. Et pariatur deserunt consectetur dolor minim duis. Esse aute et cupidatat veniam ipsum reprehenderit nisi voluptate eu et do. Excepteur exercitation pariatur voluptate ex dolor incididunt. Magna ex duis minim dolore ea non. Duis consequat sint qui cupidatat. Esse excepteur magna commodo excepteur id.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 625
            },
            {
                "id": 5,
                "name": "Datagen",
                "description": "Id aliquip sit occaecat dolor laboris magna cillum eu pariatur sint sit cupidatat occaecat. Mollit id laborum adipisicing enim ut tempor cupidatat consequat ullamco quis. Mollit eiusmod exercitation magna qui proident quis pariatur. Id ad sint adipisicing exercitation Lorem ex. Culpa commodo non veniam voluptate est ullamco exercitation sit anim dolore mollit ut id nulla.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 196
            },
            {
                "id": 6,
                "name": "Matrixity",
                "description": "Tempor et dolore velit consectetur nulla reprehenderit ex ipsum et id veniam fugiat. Esse commodo proident laboris laboris laboris voluptate. In quis aliquip Lorem consequat.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 121
            },
            {
                "id": 7,
                "name": "Cedward",
                "description": "Dolore cillum Lorem cupidatat proident elit adipisicing. Excepteur dolore qui pariatur elit Lorem. Id pariatur et elit consequat adipisicing. Mollit ex amet id elit quis cupidatat consequat nulla pariatur occaecat id. Duis et velit tempor nisi nostrud eiusmod enim exercitation in.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 147
            },
            {
                "id": 8,
                "name": "Ronbert",
                "description": "Aute consequat mollit officia est eiusmod et ex exercitation adipisicing Lorem magna. Sit id exercitation magna do magna irure ad eiusmod quis dolore tempor incididunt incididunt magna. Dolore incididunt et commodo ad consectetur incididunt incididunt qui veniam non ea commodo proident anim. Sit cupidatat proident culpa magna sit laborum aliquip minim cillum ut ut.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 935
            },
            {
                "id": 9,
                "name": "Savvy",
                "description": "Cillum qui velit nisi et sunt consectetur. Do labore labore magna est sunt nostrud. Irure irure officia laboris do nulla excepteur labore ipsum dolore consectetur ut tempor sit. Culpa Lorem deserunt ut culpa labore labore quis officia reprehenderit id esse occaecat reprehenderit. Veniam dolore incididunt amet irure quis laborum Lorem occaecat. Proident non labore commodo qui incididunt.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 504
            },
            {
                "id": 10,
                "name": "Plasmos",
                "description": "Commodo consectetur sit voluptate enim. Laboris et nisi ullamco culpa nostrud cillum id culpa nisi eu tempor nostrud. In dolor voluptate amet laborum qui ut sint deserunt excepteur quis id eiusmod. Dolor in veniam duis incididunt Lorem culpa consectetur nisi dolore dolor sit sunt mollit voluptate. Et veniam id ipsum in nisi ad cupidatat. Anim deserunt id elit et. Ut eiusmod sit ipsum sint velit id qui.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 935
            },
            {
                "id": 11,
                "name": "Eclipto",
                "description": "In exercitation labore ullamco ex laborum incididunt sint sunt consequat qui. Laboris tempor cillum mollit deserunt aute aliquip adipisicing dolore nisi. Id officia sint adipisicing pariatur ad magna ullamco duis irure qui consequat amet elit mollit. Id magna ut pariatur consectetur non commodo pariatur sit Lorem aliquip nostrud Lorem officia. Laboris tempor dolor elit et.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 497
            },
            {
                "id": 12,
                "name": "Fortean",
                "description": "Esse laboris nostrud non aute et est aliquip. Labore non nisi voluptate exercitation incididunt sint magna veniam qui do. Culpa deserunt velit sint duis veniam magna est ullamco esse reprehenderit elit dolor duis veniam. Enim incididunt fugiat deserunt occaecat in tempor incididunt amet sunt qui. Laboris irure et tempor proident anim amet ipsum consectetur est sint nulla. Occaecat quis est officia ullamco amet id occaecat officia adipisicing labore.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 365
            },
            {
                "id": 13,
                "name": "Interloo",
                "description": "Ipsum labore eu excepteur consectetur laborum quis sunt Lorem tempor officia irure eu quis. Ipsum deserunt adipisicing exercitation exercitation nostrud et commodo consectetur ipsum do incididunt duis dolore. Pariatur velit adipisicing excepteur id mollit nulla sunt exercitation. Ad est quis ut Lorem esse reprehenderit laboris adipisicing amet commodo. Magna laboris consectetur quis Lorem elit ut occaecat ullamco.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 838
            },
            {
                "id": 14,
                "name": "Eternis",
                "description": "Reprehenderit voluptate sint ipsum labore enim Lorem dolor occaecat voluptate amet dolore ea sint. Dolor id duis exercitation sint aute Lorem ex pariatur. Ullamco amet cillum ea do labore irure aliquip excepteur dolor amet. Consectetur dolor est fugiat ullamco labore aliqua quis et sint. Quis exercitation laborum nostrud consectetur ut consectetur sint velit nulla anim minim. Minim elit aute occaecat proident dolor aute sunt eiusmod magna.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 145
            },
            {
                "id": 15,
                "name": "Autograte",
                "description": "Commodo nisi Lorem commodo proident consequat laborum irure nisi deserunt officia. Incididunt incididunt proident consectetur consequat velit aliquip dolore laborum voluptate reprehenderit proident ad. Labore do pariatur nostrud occaecat proident do.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 582
            },
            {
                "id": 16,
                "name": "Zillan",
                "description": "Consequat ipsum officia incididunt ad labore ad nostrud tempor minim. Culpa ea sunt incididunt duis elit ipsum amet id eiusmod nostrud ea. Culpa pariatur esse officia proident cupidatat mollit exercitation laborum adipisicing consequat velit fugiat excepteur minim. Amet minim adipisicing laborum aliqua. Ullamco eu qui velit non minim in ipsum laborum anim incididunt. Dolor dolor esse nostrud elit ipsum deserunt ut excepteur velit irure voluptate labore deserunt. Consectetur et veniam ad duis dolor id nostrud.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 497
            },
            {
                "id": 17,
                "name": "Kog",
                "description": "Ipsum ut quis laborum anim veniam mollit ullamco in veniam nulla officia. Irure minim consequat ad excepteur minim incididunt tempor ullamco fugiat aliqua cupidatat aliquip incididunt. Aute fugiat laboris qui incididunt do labore reprehenderit ea deserunt. Aliquip voluptate exercitation labore velit pariatur deserunt ad consequat non veniam incididunt enim.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 887
            },
            {
                "id": 18,
                "name": "Urbanshee",
                "description": "Pariatur exercitation anim proident cupidatat non velit anim et ex excepteur incididunt. Voluptate ex amet quis ut magna ad nostrud eiusmod culpa veniam. In anim minim eiusmod elit quis excepteur nostrud.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 797
            },
            {
                "id": 19,
                "name": "Dyno",
                "description": "Excepteur pariatur amet culpa et labore amet ipsum. Commodo et anim reprehenderit qui dolor aliquip anim. Nostrud proident sunt irure laboris sint. Non tempor culpa ipsum do. Minim proident magna elit consectetur ut et ipsum veniam.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 921
            },
            {
                "id": 20,
                "name": "Kongle",
                "description": "Sit irure sint exercitation deserunt Lorem laboris. Non sint enim exercitation occaecat nisi dolore in adipisicing velit. Ad quis ullamco labore irure Lorem dolore pariatur dolor occaecat consectetur. Duis commodo pariatur amet proident adipisicing aliqua pariatur irure. Nulla consectetur amet enim mollit. Proident sit exercitation enim ex mollit ut non in duis.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 509
            },
            {
                "id": 21,
                "name": "Phormula",
                "description": "Labore eu elit ad eu consectetur laboris reprehenderit sint dolore reprehenderit. Elit duis tempor veniam occaecat aute ad sit elit. Ipsum mollit consequat elit officia non. Id cupidatat occaecat consectetur nisi aliquip consequat. Tempor sunt minim pariatur duis mollit exercitation labore aliquip tempor nostrud cillum nostrud adipisicing eiusmod.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 102
            },
            {
                "id": 22,
                "name": "Kozgene",
                "description": "Labore Lorem nostrud veniam do sit occaecat. Esse ad culpa veniam enim mollit non incididunt laborum velit voluptate adipisicing. Ex esse proident irure in sint culpa consectetur magna sit aliquip culpa et nisi laborum. Cillum anim excepteur nostrud nisi velit officia duis aliqua esse veniam deserunt dolor laboris. Deserunt eu velit exercitation pariatur eiusmod. Consectetur ullamco do dolore et. In dolore cupidatat ullamco do deserunt non.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 615
            },
            {
                "id": 23,
                "name": "Ginkogene",
                "description": "In non duis velit amet. Cupidatat velit fugiat consectetur culpa. Veniam veniam aliqua veniam do. Ipsum duis anim laborum laborum aute tempor elit. Amet voluptate culpa labore incididunt velit mollit ex occaecat veniam veniam exercitation consequat.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 323
            },
            {
                "id": 24,
                "name": "Kidgrease",
                "description": "Officia est elit dolore do adipisicing non nisi proident labore qui. Ipsum culpa pariatur adipisicing reprehenderit fugiat deserunt tempor ipsum sit dolor incididunt id. Sit deserunt veniam consequat reprehenderit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 196
            },
            {
                "id": 25,
                "name": "Dancerity",
                "description": "Laboris commodo ad exercitation adipisicing adipisicing velit ut exercitation ullamco quis laboris tempor. Reprehenderit esse Lorem est aute anim anim ad cillum exercitation qui velit. Reprehenderit ullamco aliquip nulla commodo amet aliqua non.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 685
            },
            {
                "id": 26,
                "name": "Steelfab",
                "description": "Eiusmod qui voluptate ex veniam laborum nisi qui irure deserunt. Aliquip commodo amet est incididunt mollit ex quis cillum. Anim qui excepteur laboris cupidatat pariatur proident. Eu culpa amet id deserunt est excepteur non cillum dolore eu dolor est qui nulla. Consequat aute Lorem sint ullamco labore elit in sint. Et commodo dolor quis sunt eiusmod aute. Laboris officia laborum sit ipsum minim amet.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 426
            },
            {
                "id": 27,
                "name": "Myopium",
                "description": "Qui esse magna aute ipsum cillum. Veniam velit dolor occaecat duis id eiusmod eu nisi ut pariatur pariatur. Velit dolor deserunt reprehenderit velit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 543
            },
            {
                "id": 28,
                "name": "Automon",
                "description": "Nostrud dolor dolore quis anim veniam do elit. Anim ad ut eiusmod voluptate commodo proident. Do culpa ea laboris qui Lorem eiusmod cillum cupidatat. Occaecat adipisicing consectetur amet nisi adipisicing aliquip laborum nisi mollit occaecat adipisicing culpa consectetur adipisicing. Excepteur id nostrud ea aliquip duis. Eu non ea incididunt enim ipsum adipisicing cupidatat consequat labore non amet.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 872
            },
            {
                "id": 29,
                "name": "Buzzworks",
                "description": "Dolor ut tempor duis laboris anim nostrud non culpa. Exercitation nulla deserunt incididunt laborum ex laborum pariatur irure nulla exercitation officia. Reprehenderit id ex dolore irure dolore mollit reprehenderit in. Qui deserunt proident cillum id cillum. Occaecat enim amet aliquip duis culpa magna labore ipsum. Et anim officia sunt dolore deserunt aute. Veniam excepteur mollit id do culpa est consectetur id minim sunt laboris irure occaecat cillum.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 805
            },
            {
                "id": 30,
                "name": "Idealis",
                "description": "Aute ut exercitation ex sunt eu ad labore. Nulla excepteur aute deserunt dolor magna reprehenderit nulla culpa enim ipsum. Commodo laborum cillum tempor qui ea tempor non pariatur enim esse aute labore labore. Labore incididunt incididunt sit dolore esse ullamco ullamco non aliquip voluptate excepteur. Dolore dolore veniam labore aliqua amet commodo. Ullamco deserunt occaecat sit mollit ad duis ea quis laboris.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 754
            },
            {
                "id": 31,
                "name": "Unia",
                "description": "Laboris exercitation laborum Lorem sit magna amet ea nisi occaecat tempor id exercitation mollit aliquip. Non sunt adipisicing labore proident ut esse. Sint consectetur voluptate qui amet sit commodo culpa.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 877
            },
            {
                "id": 32,
                "name": "Cujo",
                "description": "Labore in ea elit tempor laboris reprehenderit veniam occaecat ullamco incididunt officia. Esse adipisicing sint velit ipsum mollit consequat officia nostrud et consectetur quis. Consequat deserunt quis reprehenderit adipisicing culpa.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 774
            },
            {
                "id": 33,
                "name": "Neurocell",
                "description": "Enim tempor dolore tempor consectetur sint veniam magna magna. Veniam minim dolore exercitation deserunt sunt reprehenderit tempor do dolor qui amet. Do dolor reprehenderit est et Lorem consectetur mollit voluptate. Eu tempor dolor fugiat voluptate laborum tempor incididunt nostrud magna irure. Pariatur nulla deserunt labore pariatur nulla occaecat fugiat nostrud irure eu. Consectetur minim est in quis ut veniam fugiat labore ut ipsum ut in ea anim. Deserunt ullamco aute sit exercitation mollit aliquip nostrud.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 871
            },
            {
                "id": 34,
                "name": "Immunics",
                "description": "Eiusmod proident proident ipsum in ut amet reprehenderit tempor. Ad sunt amet dolor consequat nostrud exercitation sunt occaecat aliqua Lorem et. Deserunt amet cupidatat ut dolore tempor qui et sunt adipisicing. Dolore do labore cupidatat tempor id nulla ullamco nulla non. Nostrud adipisicing reprehenderit aliqua dolor elit nostrud. Amet amet occaecat occaecat consequat quis excepteur eiusmod Lorem mollit duis elit. Amet dolore enim nisi reprehenderit cillum proident magna culpa ullamco enim veniam mollit culpa id.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 540
            },
            {
                "id": 35,
                "name": "Niquent",
                "description": "Ullamco consectetur dolor anim officia dolore anim cupidatat dolor tempor fugiat nisi occaecat reprehenderit. Officia eu esse deserunt in aute id aliqua sint elit ullamco reprehenderit nostrud. Qui nostrud amet enim ad et eu adipisicing amet aliquip fugiat in exercitation aliquip. Pariatur fugiat laboris consequat non qui ut mollit. Anim mollit laboris nulla pariatur ea exercitation ex mollit pariatur sint commodo. Labore incididunt nostrud tempor nisi id minim. Officia pariatur irure qui irure nostrud elit nisi.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 307
            },
            {
                "id": 36,
                "name": "Optique",
                "description": "Aliqua reprehenderit quis consectetur quis cupidatat culpa do magna ullamco laborum occaecat dolore est ipsum. Id eiusmod exercitation fugiat quis eiusmod. Nulla ea aute et laboris proident in Lorem sit officia est. Quis sint eu quis fugiat aute nisi nisi qui ut esse aliquip labore occaecat. Est eu ex proident qui amet tempor.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 395
            },
            {
                "id": 37,
                "name": "Springbee",
                "description": "Eiusmod ullamco nulla proident aliqua. Nostrud excepteur voluptate culpa dolore deserunt in ex deserunt in. Excepteur Lorem aliqua culpa eiusmod aliqua laborum amet qui. Nostrud culpa amet ullamco Lorem incididunt Lorem ipsum culpa fugiat aliquip qui aliquip.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 216
            },
            {
                "id": 38,
                "name": "Xixan",
                "description": "Aute cupidatat est irure ut enim est dolor consequat culpa ea amet. Sint ad sint ipsum incididunt culpa duis laborum ut. Esse ut veniam ad duis amet id enim commodo in quis. In excepteur nostrud sit veniam amet. Magna ex fugiat anim labore incididunt esse laboris eiusmod nostrud cillum incididunt qui irure sint. Incididunt sit anim sit sint duis.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 199
            },
            {
                "id": 39,
                "name": "Netplode",
                "description": "Ullamco velit veniam Lorem sit exercitation ex consectetur sint anim culpa Lorem aute aute velit. Do anim eu incididunt ullamco velit veniam exercitation ullamco amet deserunt laborum non. Aliqua qui aliquip exercitation et laborum Lorem quis ex laborum incididunt dolore aliqua. Id occaecat officia tempor dolor laboris. Sunt qui duis est exercitation exercitation magna velit Lorem quis. Ipsum amet laboris consequat elit tempor minim eiusmod. Exercitation ullamco reprehenderit enim commodo do magna ut sunt labore.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 139
            },
            {
                "id": 40,
                "name": "Hatology",
                "description": "Deserunt aliqua cillum officia minim veniam anim amet ut qui aliqua fugiat aliqua irure aliqua. Officia elit veniam id culpa labore quis. Sint cupidatat ut eiusmod aliqua ea deserunt deserunt elit do eu magna dolor. Eiusmod culpa proident non enim exercitation eu velit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 187
            },
            {
                "id": 41,
                "name": "Zilencio",
                "description": "Qui mollit incididunt dolor anim minim. Excepteur officia enim cupidatat qui eu commodo commodo deserunt est officia laborum esse minim ea. Eu mollit ad commodo mollit cillum laborum. Aute eiusmod ut cillum anim. Laborum mollit non elit velit voluptate.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 424
            },
            {
                "id": 42,
                "name": "Squish",
                "description": "Qui exercitation ea tempor tempor minim ullamco cupidatat sunt proident. Magna est tempor occaecat proident laboris voluptate excepteur velit culpa pariatur sint. Fugiat mollit dolore tempor nisi officia. In sit velit sunt veniam aliqua ipsum in ex quis laboris.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 846
            },
            {
                "id": 43,
                "name": "Exovent",
                "description": "Deserunt occaecat qui nisi tempor. Eu pariatur mollit consectetur minim et voluptate quis amet officia esse. Aliquip esse enim Lorem ipsum duis nostrud ad irure elit reprehenderit veniam ad magna. Dolor tempor adipisicing voluptate ad mollit consectetur ullamco eiusmod quis commodo.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 472
            },
            {
                "id": 44,
                "name": "Sustenza",
                "description": "Deserunt occaecat deserunt voluptate deserunt et qui laboris fugiat ipsum dolore ullamco fugiat deserunt irure. Incididunt ullamco tempor eu culpa est incididunt labore magna nostrud. Et enim labore ut eu laboris nostrud velit Lorem id eiusmod minim. Ullamco non id aliqua tempor aliqua consectetur id pariatur commodo elit sit esse dolore dolore.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 822
            },
            {
                "id": 45,
                "name": "Undertap",
                "description": "Nisi occaecat sunt consequat nisi ullamco ut. Aliqua fugiat ullamco enim et mollit est. Ut ad adipisicing eu veniam excepteur Lorem proident laborum elit exercitation irure. Ut ullamco aute sunt occaecat et amet amet id tempor et ea.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 942
            },
            {
                "id": 46,
                "name": "Canopoly",
                "description": "Proident anim cillum ut culpa ut sunt ut aliqua voluptate. Minim velit ea eu sunt reprehenderit sit. Ex ea tempor est in enim. Proident aute ea elit commodo magna fugiat deserunt anim. Laborum duis laboris veniam aute fugiat enim laborum consectetur occaecat proident dolore aliquip.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 567
            },
            {
                "id": 47,
                "name": "Fanfare",
                "description": "Cillum et laborum laboris mollit do excepteur incididunt nostrud reprehenderit culpa dolor fugiat. Nostrud commodo ipsum non commodo irure voluptate quis. Aliquip pariatur consequat aliqua exercitation laboris. Ut sint est laborum ex do labore fugiat sunt eiusmod. Magna officia ea amet qui nostrud.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 523
            },
            {
                "id": 48,
                "name": "Hopeli",
                "description": "Ipsum tempor irure commodo anim enim pariatur quis Lorem do. Non aliqua officia id esse ut quis. Ipsum esse reprehenderit amet exercitation reprehenderit in ipsum culpa. Veniam commodo est nulla consequat consequat et amet id quis ex ipsum laborum eiusmod.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 815
            },
            {
                "id": 49,
                "name": "Exospeed",
                "description": "Ad do officia esse et. Dolore officia deserunt ea ipsum et incididunt labore ex sunt exercitation pariatur irure. Reprehenderit qui reprehenderit pariatur incididunt culpa incididunt minim. Non reprehenderit aute occaecat velit et est nisi laboris nostrud amet Lorem nisi. Consequat ut anim dolore labore ut sunt dolore. Commodo ipsum officia velit Lorem nostrud id laboris consequat dolore aute qui irure anim. Labore adipisicing id ut tempor cillum laborum Lorem veniam aute aliquip veniam voluptate officia.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 825
            },
            {
                "id": 50,
                "name": "Hyplex",
                "description": "Anim id ut est laborum deserunt incididunt eu. Ad amet deserunt ad voluptate. Deserunt magna dolor minim qui cupidatat aliqua. Ex mollit sint veniam ut consectetur quis fugiat eu sint et. Non adipisicing id nisi adipisicing cillum. Aute veniam cupidatat quis velit anim pariatur amet eiusmod aliquip minim quis occaecat nostrud officia.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 310
            },
            {
                "id": 51,
                "name": "Snips",
                "description": "Tempor proident adipisicing culpa qui enim nostrud cillum dolore veniam commodo id. Excepteur eu ut minim anim eu laborum dolore dolore tempor. Cillum aliquip pariatur consectetur sint voluptate cupidatat ad dolore. Velit magna elit laboris sit dolore occaecat enim. Commodo commodo veniam commodo sunt ut voluptate reprehenderit dolor consequat aute voluptate nostrud occaecat. Id do pariatur elit ex anim amet cillum eiusmod incididunt magna nisi. Irure tempor dolor dolor ut minim culpa non fugiat cupidatat ullamco aute ut non.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 787
            },
            {
                "id": 52,
                "name": "Oceanica",
                "description": "Enim officia est incididunt excepteur occaecat ipsum nulla in non cupidatat. Culpa nulla exercitation amet quis reprehenderit non tempor sunt commodo exercitation quis. Non sint minim id proident id duis veniam ad amet sit elit sunt. Dolore reprehenderit consequat tempor est ullamco ex Lorem. Labore id incididunt cillum sint dolore eu laborum occaecat qui dolore. Magna commodo consectetur dolor in anim labore cillum et do est velit ullamco. Sunt ut non do dolore dolor incididunt ex laborum enim voluptate fugiat reprehenderit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 434
            },
            {
                "id": 53,
                "name": "Vinch",
                "description": "Proident ullamco nisi esse ullamco cillum velit amet voluptate eiusmod labore nostrud. Magna minim dolore velit ullamco. Nisi aliqua exercitation reprehenderit sint magna cillum laboris excepteur reprehenderit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 459
            },
            {
                "id": 54,
                "name": "Idetica",
                "description": "Laborum nulla laborum laborum ea mollit ea non exercitation excepteur aliqua duis aute. Anim sunt irure incididunt cupidatat quis. Mollit fugiat exercitation officia ullamco veniam sit laborum elit irure. Labore pariatur magna laborum qui Lorem. Elit anim proident eiusmod ea et consectetur laborum ex excepteur anim. Pariatur aliquip nulla ad do voluptate non nostrud voluptate. Magna non veniam officia voluptate amet ullamco ullamco enim non laboris esse dolor est incididunt.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 852
            },
            {
                "id": 55,
                "name": "Locazone",
                "description": "Ex in nisi ea esse excepteur dolore eiusmod. Sint ad laboris sit nostrud laborum labore. Anim magna quis aute irure magna. Ad dolore culpa ipsum consequat nisi est anim. Amet reprehenderit et do cupidatat eiusmod fugiat.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 130
            },
            {
                "id": 56,
                "name": "Singavera",
                "description": "Non ipsum culpa aute aliqua velit ad laborum. Exercitation ex nisi consequat adipisicing consequat adipisicing velit. Labore aute ad deserunt ipsum sint dolore qui duis deserunt qui officia. Labore laborum irure ex minim fugiat voluptate consequat nisi nulla sit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 584
            },
            {
                "id": 57,
                "name": "Neptide",
                "description": "Esse qui eu ipsum occaecat amet nisi in qui occaecat voluptate ex cupidatat. Mollit nisi do laboris est. Laborum sint veniam adipisicing voluptate aliquip. Irure consequat non dolore dolore eu ex sit tempor ex fugiat reprehenderit irure. Ipsum aliqua officia aliquip nostrud in.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 663
            },
            {
                "id": 58,
                "name": "Imperium",
                "description": "Consectetur cillum et duis adipisicing dolore reprehenderit est fugiat elit do. Qui esse nulla ut et. Incididunt non elit minim amet eiusmod aliqua mollit. Nostrud qui excepteur laboris ea ea aliquip eu. Dolor elit reprehenderit in incididunt ad Lorem deserunt qui ea sit aliqua. Dolore quis non proident duis in duis ad reprehenderit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 105
            },
            {
                "id": 59,
                "name": "Proflex",
                "description": "Eiusmod aute ad esse minim occaecat. Lorem elit incididunt minim consequat eu culpa Lorem voluptate officia do consequat excepteur officia. Excepteur aliquip anim exercitation excepteur minim exercitation. Amet nulla incididunt nisi ea ex dolore ex consequat aute ullamco. Lorem incididunt labore labore veniam est officia proident labore est pariatur quis Lorem esse officia. Ipsum id veniam irure elit est irure.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 302
            },
            {
                "id": 60,
                "name": "Lumbrex",
                "description": "Magna dolore cupidatat eiusmod do eu consequat minim anim ipsum nostrud do. Minim mollit culpa reprehenderit tempor laborum laborum ea quis ex pariatur do ipsum ipsum dolor. Excepteur dolor eu exercitation velit non aliqua duis in sunt non voluptate voluptate consequat adipisicing. Ex magna eu anim labore consequat anim dolore Lorem adipisicing velit duis est. Sit cillum aute commodo cillum voluptate sint ad veniam id magna aute sit cupidatat. Et nulla ex proident laborum.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 649
            },
            {
                "id": 61,
                "name": "Bovis",
                "description": "Laboris ipsum eiusmod commodo incididunt exercitation occaecat velit. Exercitation eu officia nostrud exercitation eu enim id do. Nostrud Lorem commodo proident pariatur aliquip sint enim laborum tempor deserunt enim. Dolor ad pariatur est sit nulla aute duis veniam Lorem nisi aliquip sint ad et. Ea fugiat incididunt excepteur adipisicing laborum aliquip ipsum aliqua sunt eu do. Dolore ea fugiat ad culpa laboris esse esse. Ea esse pariatur irure sit minim voluptate aute ea fugiat velit elit exercitation.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 744
            },
            {
                "id": 62,
                "name": "Rugstars",
                "description": "Ullamco veniam laboris eiusmod anim veniam sint eu. Incididunt fugiat dolore do dolore laborum eu labore eu. Enim quis labore aute ex veniam in id consectetur exercitation anim. Veniam aute nulla do tempor. Nostrud eiusmod amet do adipisicing qui sunt excepteur deserunt esse sint excepteur. Ipsum ut pariatur velit id nulla excepteur. Mollit ea voluptate ad incididunt ut dolor esse laborum eiusmod adipisicing et sit duis proident.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 763
            },
            {
                "id": 63,
                "name": "Incubus",
                "description": "Laborum consequat nostrud Lorem eiusmod in nulla Lorem eiusmod in eiusmod ea irure esse. Est minim sunt pariatur laboris commodo mollit velit. Consectetur aliquip in minim reprehenderit id ullamco nulla velit reprehenderit veniam veniam. Laboris amet commodo id aliquip anim. Lorem incididunt sit id velit elit. Dolor enim cupidatat culpa nostrud irure officia ullamco nisi nisi irure commodo. Amet eu est deserunt ut.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 352
            },
            {
                "id": 64,
                "name": "Isodrive",
                "description": "Dolore amet reprehenderit aute officia fugiat ullamco mollit minim aliqua ad consectetur cupidatat. Voluptate incididunt mollit cupidatat veniam incididunt exercitation dolore occaecat Lorem culpa. Fugiat esse adipisicing cupidatat cupidatat consectetur labore proident sint elit in sit tempor ipsum. Nulla mollit nisi proident laborum nulla proident officia. Sunt in aliqua ex et velit sunt ex anim aute. Est sit excepteur cupidatat duis cillum sint duis consequat cillum in ullamco. Consequat aliquip laborum velit occaecat aute incididunt irure tempor minim veniam.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 958
            },
            {
                "id": 65,
                "name": "Blanet",
                "description": "Excepteur tempor eiusmod voluptate aliquip occaecat laborum. Aliqua consequat dolor tempor quis esse pariatur duis culpa. Reprehenderit consequat aliqua duis consequat ipsum dolore commodo tempor ut.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 368
            },
            {
                "id": 66,
                "name": "Comvex",
                "description": "Magna id cupidatat quis aliquip laboris adipisicing laboris. Elit consequat Lorem laboris eu cillum. Culpa nulla ullamco Lorem pariatur duis officia exercitation ut laboris. Sint ea magna tempor deserunt aute est ullamco laboris. Nulla eiusmod do ipsum eu. Officia consectetur pariatur aliquip officia do culpa ad anim ut ea consequat incididunt.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 327
            },
            {
                "id": 67,
                "name": "Terragen",
                "description": "Officia est ex excepteur laboris elit. Esse culpa irure dolor tempor fugiat adipisicing quis occaecat culpa incididunt consectetur ad. Ea consectetur consequat irure qui anim Lorem sit excepteur ad magna reprehenderit laboris irure. Laboris incididunt ullamco aliquip aliqua mollit laborum non et eiusmod tempor Lorem duis excepteur officia.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 457
            },
            {
                "id": 68,
                "name": "Quantalia",
                "description": "Magna ex enim laboris amet id aliquip sint. Fugiat sint consectetur dolor tempor cupidatat mollit mollit laborum adipisicing aliquip veniam ipsum. Sit laborum eiusmod qui magna incididunt. Aliqua sunt excepteur pariatur voluptate anim. Aliqua minim mollit minim esse pariatur. Nostrud velit duis nulla labore in non officia reprehenderit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 391
            },
            {
                "id": 69,
                "name": "Avenetro",
                "description": "Qui aliqua aliquip sint culpa amet eiusmod laboris enim incididunt sint magna elit amet do. Sunt adipisicing reprehenderit adipisicing consequat cupidatat laboris fugiat. Ex pariatur reprehenderit nulla ad ut occaecat pariatur. Id sit nostrud voluptate ut dolore cillum amet ut nulla Lorem officia. Do veniam nulla proident nisi ut cupidatat ipsum. Fugiat eu cupidatat tempor ullamco nisi occaecat sint ullamco anim nostrud.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 483
            },
            {
                "id": 70,
                "name": "Darwinium",
                "description": "Aute duis mollit ullamco occaecat qui excepteur reprehenderit consequat veniam est culpa. Aute anim pariatur laborum aliqua. Nisi occaecat officia tempor esse ullamco ea ipsum reprehenderit pariatur nisi. Id aliqua exercitation culpa Lorem culpa enim. Excepteur in Lorem aliquip labore ut labore incididunt voluptate magna excepteur culpa elit. Officia id incididunt eu est amet culpa consequat irure fugiat Lorem ullamco ad adipisicing sit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 523
            },
            {
                "id": 71,
                "name": "Deminimum",
                "description": "Lorem tempor ut do est eiusmod Lorem elit ut. Aliquip esse pariatur minim nostrud qui quis duis ullamco dolor officia cillum. Fugiat qui sit elit commodo. Sint est adipisicing qui nulla voluptate proident occaecat veniam fugiat tempor ullamco excepteur. Eu ullamco est incididunt tempor.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 906
            },
            {
                "id": 72,
                "name": "Fangold",
                "description": "Fugiat fugiat officia proident do tempor. Aute proident tempor elit est sunt. Minim anim velit quis dolore quis cillum do.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 734
            },
            {
                "id": 73,
                "name": "Tetak",
                "description": "Elit laborum sunt ex consequat culpa mollit occaecat consectetur. Laboris amet cupidatat excepteur mollit aliqua non commodo excepteur. Do fugiat pariatur exercitation deserunt in. Veniam laborum consequat qui qui incididunt in incididunt exercitation consequat ullamco ex esse. Occaecat ex excepteur eu ea ad nostrud adipisicing deserunt mollit ut enim. Officia esse occaecat et veniam non dolor elit velit veniam duis est aute aliquip laboris. Dolore commodo ea mollit deserunt et irure irure aliqua mollit culpa ex aute eu.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 986
            },
            {
                "id": 74,
                "name": "Bizmatic",
                "description": "Sint exercitation elit tempor quis reprehenderit. Occaecat cupidatat reprehenderit nulla non quis magna aute ut. Exercitation amet ut velit reprehenderit cillum commodo labore officia qui ad. Exercitation nulla consectetur eiusmod exercitation elit nisi tempor magna labore. Id Lorem nostrud proident adipisicing laborum quis.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 121
            },
            {
                "id": 75,
                "name": "Miracula",
                "description": "Ex pariatur deserunt tempor labore aliqua nisi ullamco est. Est dolore pariatur sint nisi ut. Dolore deserunt consequat incididunt adipisicing cupidatat deserunt sint ea voluptate.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 969
            },
            {
                "id": 76,
                "name": "Steeltab",
                "description": "Est deserunt sunt in in non deserunt veniam adipisicing cupidatat id et. Ea proident culpa cillum nulla do reprehenderit ea excepteur sint. Fugiat magna officia proident est nostrud eiusmod ipsum eu sunt culpa eiusmod dolore commodo in. Pariatur voluptate ea eiusmod sit do.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 630
            },
            {
                "id": 77,
                "name": "Frosnex",
                "description": "Veniam non ut occaecat in id proident labore. Sit nostrud ipsum ad mollit mollit. Sint adipisicing Lorem sunt sint sunt consectetur laboris in occaecat.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 541
            },
            {
                "id": 78,
                "name": "Pushcart",
                "description": "Enim in aute consectetur exercitation pariatur et aliquip exercitation nostrud voluptate nisi magna. Tempor ipsum laborum eu nulla ad commodo laboris do eiusmod. Irure ipsum ipsum velit sit. Ipsum elit ullamco ipsum mollit culpa. Mollit ipsum aliquip ipsum qui. Est consequat duis voluptate et laborum excepteur sunt ad ex. Exercitation nulla et ipsum magna velit sunt irure adipisicing occaecat anim Lorem.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 236
            },
            {
                "id": 79,
                "name": "Datagene",
                "description": "Fugiat ex velit amet cillum occaecat nulla voluptate minim sit aute deserunt consectetur amet. Veniam anim mollit magna quis fugiat elit est laboris occaecat. Elit esse elit velit in anim proident aliqua officia occaecat deserunt sint.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 863
            },
            {
                "id": 80,
                "name": "Moltonic",
                "description": "Excepteur irure sit sunt id cillum cillum. Aliquip nisi nisi excepteur aute ullamco Lorem ad magna esse ex. Non sit tempor ullamco ex dolore est laborum eu cupidatat. Nulla ex nostrud deserunt enim nostrud cupidatat. Sit culpa pariatur adipisicing dolore minim aliquip amet et mollit do laborum.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 187
            },
            {
                "id": 81,
                "name": "Joviold",
                "description": "Commodo proident magna ipsum pariatur sint adipisicing sunt. In pariatur occaecat veniam occaecat enim deserunt laborum incididunt. Do ea aliqua aliquip in magna labore enim officia velit mollit ipsum. Labore nostrud dolore officia anim amet est voluptate et mollit sunt eu aliqua. Eu Lorem ullamco veniam proident laboris id proident tempor non culpa mollit deserunt. Esse cupidatat aliquip ad aliquip.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 301
            },
            {
                "id": 82,
                "name": "Genmom",
                "description": "Ea cupidatat adipisicing aliquip velit dolore ex nostrud veniam id reprehenderit veniam excepteur enim. Tempor deserunt duis voluptate occaecat labore aliqua ullamco sit. Quis minim id commodo quis Lorem sunt commodo incididunt duis dolore amet aliqua incididunt. Aliquip aute commodo magna enim.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 418
            },
            {
                "id": 83,
                "name": "Enjola",
                "description": "Incididunt velit minim nisi duis consectetur aliquip irure dolore cillum velit velit tempor est. Velit veniam Lorem nisi ipsum. Est incididunt consequat ut aliquip ea dolore sit id laboris. Nulla pariatur Lorem magna commodo culpa enim nisi deserunt eu fugiat. Sunt eu mollit ullamco eu do anim incididunt incididunt laborum fugiat ea excepteur exercitation. Magna velit aliqua consequat pariatur minim.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 911
            },
            {
                "id": 84,
                "name": "Quilk",
                "description": "Pariatur proident occaecat reprehenderit minim. Elit duis irure qui ea ad ad commodo laboris esse mollit. Enim duis esse labore quis ipsum eiusmod dolor reprehenderit fugiat in. Veniam exercitation in veniam elit minim ad aliquip anim irure pariatur.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 947
            },
            {
                "id": 85,
                "name": "Tubesys",
                "description": "Excepteur eiusmod exercitation exercitation fugiat fugiat in do ullamco esse non labore ex eiusmod incididunt. Culpa veniam id esse nisi deserunt cillum elit ex culpa ad. Do consectetur laboris quis deserunt ex amet aute.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 918
            },
            {
                "id": 86,
                "name": "Ezentia",
                "description": "Commodo ex pariatur laboris amet occaecat nostrud ex officia exercitation nostrud anim anim. Occaecat veniam laboris elit esse id exercitation incididunt adipisicing dolor ut cupidatat mollit amet proident. Veniam ut pariatur proident quis minim laborum quis sunt adipisicing cillum. Ea veniam officia nisi exercitation consectetur sit magna consectetur duis est anim nisi aute. Excepteur ipsum amet aliquip mollit et irure est ea tempor proident elit. Veniam cupidatat irure proident magna quis ullamco do ipsum consequat ipsum ipsum adipisicing officia do.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 184
            },
            {
                "id": 87,
                "name": "Geoform",
                "description": "Enim elit enim cillum amet aute magna voluptate occaecat veniam ex duis veniam velit. Nisi ipsum tempor tempor elit labore reprehenderit est elit nostrud irure do cupidatat. Nostrud pariatur culpa consectetur veniam tempor quis. Ipsum cillum consectetur officia in anim cillum eu ipsum dolor. Sit incididunt exercitation qui sint et mollit sint id anim aute incididunt. Pariatur duis esse aliquip sit eu cupidatat. Ad ullamco veniam excepteur enim id.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 242
            },
            {
                "id": 88,
                "name": "Comvene",
                "description": "Eiusmod Lorem eiusmod esse quis non. Occaecat sunt duis aute cillum esse eu ipsum sit id laborum nostrud aliqua ex commodo. Laboris duis cupidatat reprehenderit ut. Duis proident in aliquip aute exercitation minim magna velit deserunt occaecat. Sint sunt nulla ut non adipisicing velit ad qui ipsum ut sunt qui. Magna excepteur elit ea nisi proident Lorem non do ipsum reprehenderit officia consectetur.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 203
            },
            {
                "id": 89,
                "name": "Dentrex",
                "description": "Quis consectetur proident enim non do. Eiusmod proident ullamco Lorem incididunt. Non veniam sit laborum esse labore duis pariatur nulla adipisicing dolore tempor. Elit quis dolor ea sunt anim exercitation sunt fugiat duis.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 902
            },
            {
                "id": 90,
                "name": "Medicroix",
                "description": "Elit exercitation qui laborum labore nulla est elit non magna in quis ex voluptate. Non consectetur dolore irure esse reprehenderit voluptate eu fugiat ex aliquip excepteur consequat Lorem. Ad minim laboris aliqua id velit dolor qui laboris.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 428
            },
            {
                "id": 91,
                "name": "Manglo",
                "description": "Ut elit aliqua voluptate veniam magna culpa velit eu enim. Irure tempor sit ea laboris sunt do. Enim est velit eu laborum dolore labore elit tempor aute veniam ipsum. Tempor enim irure id id veniam cupidatat aliquip. Mollit labore ullamco exercitation irure Lorem amet anim mollit excepteur dolor.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 440
            },
            {
                "id": 92,
                "name": "Adornica",
                "description": "Enim labore ex veniam cillum laborum ea exercitation sit esse labore aute ullamco adipisicing ullamco. Qui ut consequat nostrud duis occaecat labore fugiat Lorem veniam sit in amet. Eiusmod reprehenderit ipsum culpa dolore Lorem mollit dolore aute tempor aliqua aute esse fugiat. Anim eu eiusmod nisi veniam est cillum voluptate.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 693
            },
            {
                "id": 93,
                "name": "Blurrybus",
                "description": "Voluptate officia tempor in anim cupidatat consectetur proident ad non elit aute exercitation in. Reprehenderit ex sunt ut quis consequat ullamco amet eiusmod irure non enim fugiat. Sunt sunt ut nostrud commodo enim nisi. Tempor qui consectetur occaecat sit. Aliquip pariatur veniam dolore laboris id esse esse pariatur do labore fugiat velit sit sit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 246
            },
            {
                "id": 94,
                "name": "Nixelt",
                "description": "Exercitation id aliquip ipsum ullamco elit nisi nisi do. Occaecat id qui exercitation deserunt adipisicing laborum minim ullamco occaecat. Do enim et nisi consequat ea ullamco pariatur amet id ut. Cillum Lorem tempor pariatur amet Lorem culpa culpa minim ipsum voluptate sunt.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 226
            },
            {
                "id": 95,
                "name": "Roboid",
                "description": "Esse sunt ex est cupidatat mollit amet non velit nisi aliquip ipsum. Occaecat elit aliqua culpa reprehenderit voluptate eiusmod quis tempor. Tempor veniam labore cillum in ullamco dolor elit deserunt irure nulla eiusmod. Non nostrud et aute proident do duis reprehenderit esse cupidatat reprehenderit sit consectetur.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 935
            },
            {
                "id": 96,
                "name": "Prowaste",
                "description": "Voluptate dolor minim pariatur adipisicing ad elit veniam. Fugiat irure do minim velit. Veniam culpa nisi aliqua do qui sunt occaecat labore irure nisi laboris id. Eiusmod exercitation velit aliqua qui ut culpa do amet deserunt amet. Deserunt cupidatat enim nulla nulla excepteur cillum ex anim eu magna. Nisi do fugiat nulla in excepteur.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 883
            },
            {
                "id": 97,
                "name": "Musaphics",
                "description": "Ex et voluptate magna velit esse dolor ullamco nostrud sint nulla esse non. Pariatur ullamco aliquip nisi anim tempor incididunt nulla commodo dolore mollit mollit minim. Ut sit fugiat labore veniam laborum. Ex deserunt excepteur minim eiusmod occaecat velit voluptate. Et anim irure incididunt quis labore pariatur proident consectetur. Ipsum pariatur elit ea pariatur id amet proident consectetur aliquip mollit culpa voluptate. Nisi tempor cillum dolore laborum et.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 952
            },
            {
                "id": 98,
                "name": "Isonus",
                "description": "Et excepteur officia consectetur sit. Commodo cillum enim esse dolore mollit quis consequat esse ipsum. Et veniam fugiat qui id commodo non sunt occaecat quis labore anim qui. Tempor eu dolor duis anim commodo do. Excepteur qui enim do do nulla ullamco adipisicing irure dolore ipsum. Culpa excepteur id ut in fugiat ullamco duis amet velit.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 763
            },
            {
                "id": 99,
                "name": "Viagrand",
                "description": "Non enim mollit elit fugiat minim labore non nulla officia mollit. Esse minim duis pariatur labore tempor aute ea fugiat occaecat consectetur ullamco aute enim et. Eiusmod adipisicing quis consequat commodo sit aute. Anim duis tempor aute aliquip excepteur sunt eiusmod. Nulla ad adipisicing nostrud eu id.\r\n",
                "image": "http://placehold.it/32x32",
                "price": 150
            }
        ],
        compoundItems = [];

    /**
     * Item super class
     * @param {Number} id item id
     * @param {String} name item name
     * @param {String} description item description
     * @param {String} image url to item image
     * @param {Number} price item price
     * @constructor
     */
    function Item(id, name, description, image, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = Math.floor(Math.random() * 5 + 5);
        this.type = 'base';
    }


    function OnSaleItem() {                 // price = price - price * discount
        Item.apply(this, arguments);
        this.discount = Math.floor(Math.random() * 7 + 1) * 10;
        this.type = 'sale';
    }

    function OutOfStockItem() {             // disable add button
        Item.apply(this, arguments);
        this.type = 'out';
        this.quantity = 0;
    }

    (function() {
        var nmb, compoundItemConstructors = [OnSaleItem, OutOfStockItem, Item];
        items.forEach(function(item) {
            nmb = Math.floor(Math.random() * compoundItemConstructors.length);
            compoundItems.push(new compoundItemConstructors[nmb](item.id, item.name, item.description, item.image, item.price));
        });
    })();


    app.data = {
        getItems: function () {
            return compoundItems;
        },
        getItemsNmb: function () {
            return compoundItems.length;
        },
        getItemKeys: function () {
            return ['id', 'name', 'description', 'image', 'price'];
        },
        getBasicItemKeys: function () {
            return ['id', 'name', 'price'];
        }
    };
}(app));
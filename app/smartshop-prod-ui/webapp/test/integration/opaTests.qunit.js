sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'smartshopprodui/test/integration/FirstJourney',
		'smartshopprodui/test/integration/pages/ProductsList',
		'smartshopprodui/test/integration/pages/ProductsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('smartshopprodui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage
                }
            },
            opaJourney.run
        );
    }
);
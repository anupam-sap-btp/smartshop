sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'smartshopordui/test/integration/FirstJourney',
		'smartshopordui/test/integration/pages/OrdersList',
		'smartshopordui/test/integration/pages/OrdersObjectPage',
		'smartshopordui/test/integration/pages/ItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage, ItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('smartshopordui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage,
					onTheItemsObjectPage: ItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);
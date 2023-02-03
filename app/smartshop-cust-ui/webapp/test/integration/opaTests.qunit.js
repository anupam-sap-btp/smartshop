sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'smartshopcustui/test/integration/FirstJourney',
		'smartshopcustui/test/integration/pages/CustomersList',
		'smartshopcustui/test/integration/pages/CustomersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersList, CustomersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('smartshopcustui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersList: CustomersList,
					onTheCustomersObjectPage: CustomersObjectPage
                }
            },
            opaJourney.run
        );
    }
);
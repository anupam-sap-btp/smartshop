//@ui5-bundle smartshopprodui/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"smartshopprodui/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("smartshopprodui.Component",{metadata:{manifest:"json"}})});
},
	"smartshopprodui/i18n/i18n.properties":'# This is the resource bundle for smartshopprodui\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Smartshop Products\n\n#YDES: Application description\nappDescription=Products for Smartshop\n\nflpTitle=Smartshop Products\n\nflpSubtitle=Manage Products\n',
	"smartshopprodui/manifest.json":'{"_version":"1.49.0","sap.app":{"id":"smartshopprodui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.8.5","toolsId":"1db6eb48-a3e1-41f2-aca5-55b4cff91c86"},"dataSources":{"mainService":{"uri":"master/","type":"OData","settings":{"annotations":["annotation"],"localUri":"localService/metadata.xml","odataVersion":"4.0"}},"annotation":{"type":"ODataAnnotation","uri":"annotations/annotation.xml","settings":{"localUri":"annotations/annotation.xml"}}},"crossNavigation":{"inbounds":{"smartshopprodui-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"productsmartshop","action":"manage","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":"sap-icon://product"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.109.3","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"smartshopprodui.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"ProductsList","target":"ProductsList"},{"pattern":"Products({key}):?query:","name":"ProductsObjectPage","target":"ProductsObjectPage"}],"targets":{"ProductsList":{"type":"Component","id":"ProductsList","name":"sap.fe.templates.ListReport","options":{"settings":{"entitySet":"Products","variantManagement":"Page","navigation":{"Products":{"detail":{"route":"ProductsObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable","selectionMode":"Single"}}}}}},"ProductsObjectPage":{"type":"Component","id":"ProductsObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":true,"entitySet":"Products"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"smartshop"}}'
}});

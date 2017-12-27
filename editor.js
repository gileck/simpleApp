let editorSDK;

function editorReady(_editorSDK, _appDefinitionId) {
    editorSDK = _editorSDK;
    console.log(editorSDK);
    console.log(_appDefinitionId);
    const playButtonId = "comp-jb6azaiv";
    const pauseButtonId = "comp-jb69oeyw";
    const controllerId = "comp-jb510w6r";

    //TODO: call this function only in the first time....
    //addController();

    editorSDK.controllers.connect('token', {
        controllerRef: {
            type: "DESKTOP", id: controllerId
        },
        connectToRef: {
            type: "DESKTOP", id: playButtonId
        },
        role: 'Play'
    });

    editorSDK.controllers.connect('token', {
        controllerRef: {
            type: "DESKTOP", id: controllerId
        },
        connectToRef: {
            type: "DESKTOP", id: pauseButtonId
        },
        role: 'Pause'
    });



}

function onEvent(event) {
    if (event === "controllerAdded") {
        //
    }
}

function getAppManifest() {
    return {

    }
}

function addController() {
    editorSDK.pages.getCurrent().then(pageRef => {
        editorSDK.components.add('token', {
            componentDefinition: {
                componentType: 'platform.components.AppController',
                data: {
                    applicationId: _appDefinitionId,
                    controllerType: 'fooBar',
                    name: 'Item'
                }
            },
            pageRef
        })
    });
}

module.exports = {
    editorReady,
    onEvent,
    getAppManifest
};
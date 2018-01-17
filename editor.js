let editorSDK;

async function editorReady(_editorSDK, _appDefinitionId) {
    editorSDK = _editorSDK;
    console.log(editorSDK);
    console.log(_appDefinitionId);
    const playButtonId = "comp-jchfa691";
    const pauseButtonId = "comp-jchfa7wc";

    let controllerRef;
    const pageRef = await editorSDK.pages.getCurrent();

    const controllers = await editorSDK.controllers.listAllControllers();
    console.log(controllers);
    if (controllers.length === 0) {
        controllerRef = editorSDK.components.add('token', {
            componentDefinition: {
                componentType: 'platform.components.AppController',
                data: {
                    applicationId: _appDefinitionId,
                    controllerType: 'fooBar',
                    name: 'Item'
                }
            },
            pageRef
        });

        editorSDK.controllers.connect('token', {
            controllerRef,
            connectToRef: {
                type: "DESKTOP", id: playButtonId
            },
            role: 'Play'
        });
        editorSDK.controllers.connect('token', {
            controllerRef,
            connectToRef: {
                type: "DESKTOP", id: pauseButtonId
            },
            role: 'Pause'
        });

    }
}

    function onEvent(event) {
        if (event === "controllerAdded") {
            console.log(event);
        }
    }

    function getAppManifest() {
        return {}
    }


    module.exports = {
        editorReady,
        onEvent,
        getAppManifest
    };
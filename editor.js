let editorSDK;

async function editorReady(_editorSDK, _appDefinitionId) {
    editorSDK = _editorSDK;
    console.log(editorSDK);
    console.log(_appDefinitionId);
    const playButtonId = "comp-jd00kqxo";
    const pauseButtonId = "comp-jd00kpvv";

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
    } else {
        controllerRef = controllers[0].controllerRef;
    }
    editorSDK.controllers.connect('token', {
        controllerRef,
        connectToRef: {
            type: "DESKTOP", id: playButtonId
        },
        role: 'Play',
        isPrimary: true
    });
    editorSDK.controllers.connect('token', {
        controllerRef,
        connectToRef: {
            type: "DESKTOP", id: pauseButtonId
        },
        role: 'Pause',
        isPrimary: true
    });

}

function onEvent(event) {
    if (event === "controllerAdded") {
        console.log(event);
    }
}

function getAppManifest() {
    return {
        controllersStageData: {
            fooBar: {
                default: {
                    connections: {
                        "Play": {
                            "behavior": {
                                "resizable": false,
                                "toggleShowOnAllPagesEnabled": true
                            }
                        },
                        "Pause": {
                            "behavior": {
                                    "resizable": 'proportional',
                                    "toggleShowOnAllPagesEnabled": false
                            }
                        }
                    }
                }
            }
        }
    }
}


module.exports = {
    editorReady,
    onEvent,
    getAppManifest
};
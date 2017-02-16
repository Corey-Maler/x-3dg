export const X3dgProto = Object.create(HTMLElement.prototype);

// register component
X3dgProto.createdCallback = function() {
    console.log('created', this);
}

X3dgProto.attachedCallback = function() {
    console.log('attached');
}

X3dgProto.detachedCallback = function() {
    console.log('detached');
}

X3dgProto.attributeChangedCallback = function(attrName: any, oldValue: any, newValue: any) {
    console.log('attribute changes', attrName, oldValue, newValue );
}

export const X3dg = document.registerElement('x-3dg', {prototype: X3dgProto});
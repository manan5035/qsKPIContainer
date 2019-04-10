define(
    function () {
        var _getRefs = function (data, refName) {
            var ref = data;
            var name = refName;
            var props = refName.split('.');
            if (props.length > 0) {
                for (var i = 0; i < props.length - 1; ++i) {
                    if (ref[props[i]])
                        ref = ref[props[i]];
                }
                name = props[props.length - 1];
            }
            return { ref: ref, name: name };
        };

        return {
            setRefValue: function (data, refName, value) {
                var ref = data;
                var name = refName;
                var props = refName.split('.');
                if (props.length > 0) {
                    for (var i = 0; i < props.length - 1; ++i) {
                        if (!ref[props[i]])
                            ref[props[i]] = {};
                        ref = ref[props[i]];
                    }
                    name = props[props.length - 1];
                }
                ref[name] = value;
            },

            getRefValue: function (data, refName) {
                var r = _getRefs(data, refName);
                return r.ref[r.name];
            }
        };
    }
);

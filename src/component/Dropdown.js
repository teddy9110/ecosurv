import React from "react";

function Dropdown({ options, handleChange, max, requried }) {
    if (!options && !max) {
        return <div className="App">Loading...</div>;
    }
    var rows = [], i = 0, len = max;
    while (++i <= len) rows.push(i);

    return (
        <React.StrictMode>
            <div class="inline-block relative w-64">
                <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} required={requried === true}>
                    {!max ? (
                        Object.keys(options).map((item, i) => (
                            <option className="input-label" key={i}>{item}</option>
                        ))
                    ) : (
                        rows.map(function (i) {
                            return <option className="input-label" key={i}>{i}</option>
                        })
                    )}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Dropdown;
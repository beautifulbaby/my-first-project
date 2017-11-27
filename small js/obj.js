function displayInfo(args) {
    var output = "";

    if (typeof args.name == "string"){
        output += "name:" + args.name + "/n";
    }
    if (typeof args.age == "number"){
        output += "age:" + "args.age" + "/n";
    }
    console.log(output);
}
displayInfo({
    name: "Nicholas",
    age: 29
});
displayInfo({
    name: "Greg"
});
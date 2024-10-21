const viewFlagsButton = document.querySelector("#viewFlagsBtn");

viewFlagsButton.addEventListener("click", async function () {
    try {
        console.log("eventListener viewFlagsButton");
        let fetchResponse = await fetch("http://localhost:5000/redflags", {
            method: "GET"
        });

        // Log the entire response
        console.log("Fetch response:", fetchResponse);

        if (!fetchResponse.ok) {
            const errorText = await fetchResponse.text(); // Fetch error text
            console.error("Error response text:", errorText);
            throw new Error(`HTTP error! status: ${fetchResponse.status} - ${errorText}`);
        }

        // Read the response body as JSON
        const data = await fetchResponse.json(); // This will read the response body


        // [
        //     {
        //         "id": 1,
        //         "description": "test",
        //         "category": "BEHAVIOR",
        //         "examples": "test",
        //         "advice": "test",
        //         "createdAt": null,
        //         "user": {
        //             "id": 1,
        //             "username": "carroc",
        //             "password": "#¤%&",
        //             "redflags": []
        //         }
        //     }
        // ]
        // const unorderedList = document.querySelector("#fetch-data");

        const table = document.querySelector("#table")


        let hasInit = false
        data.forEach((dataVal) => {
            // for (const [key, value] of Object.entries(dataVal)) {

            if (hasInit === false) {

            // Create table headers
            let trHeader = document.createElement("tr")
            table.appendChild(trHeader)
            for (const key of Object.keys(dataVal)) {
                
                let th = document.createElement("th")
                th.innerHTML = key
                trHeader.appendChild(th)
            }

        }

            let trData = document.createElement("tr");
            table.appendChild(trData)

            for (const value of Object.values(dataVal)) {
                let td = document.createElement("td");
                if (typeof value === "object" && !Array.isArray(value) && value !== null) { 
                    td.innerHTML = value.username
                } else {
                    td.innerHTML = value;
                }
                trData.appendChild(td)

            }
            hasInit = true
                // let listEntry = document.createElement("li")
                // listEntry.innerHTML = res;
                // unorderedList.appendChild(listEntry);

                // let res = "";
                // if (typeof value === "object" && !Array.isArray(value) && value !== null) {
                //     for (const [key1, value1] of Object.entries(value)) {
                //         res += key1 + value1;
                //     }
                // } else {

                //     console.log(key, value)
                //     res += key
                //     res += value

                // }

            // }
            // console.log(value)
        })

        console.log("Fetch response data:", data);
    } catch (error) {
        console.error("Error fetching redflags:", error);
    }
});

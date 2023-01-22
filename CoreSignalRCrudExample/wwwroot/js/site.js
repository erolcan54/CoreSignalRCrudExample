
$(() => {


    var connection = new signalR.HubConnectionBuilder().withUrl("/signalRServer").build();
    connection.start();
    connection.on("LoadProducts", function () {
        LoadProdData();
    });

    LoadProdData();

    function LoadProdData() {
        var tr = '';

        $.ajax({
            url: "/Products/GetProducts",
            method: 'GET',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr += `<tr>
                                <td>${v.Name}</td>
                                <td>${v.Category}</td>
                                <td>${v.Price}</td>
                                <td>${v.Stock}</td>
                                <td>
                                    <a href='../Products/Edit?id=${v.Id}'>Edit</a>
                                    <a href='../Products/Details?id=${v.Id}'>Details</a>
                                    <a href='../Products/Delete?id=${v.Id}'>Delete</a>
                                </td>
                           </tr>`
                })

                $("#tableBody").html(tr);

            },
            error: (error) => {
                console.log(error)
            }

        });
    }

})
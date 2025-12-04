// Get all Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)
    console.log(url);

    buttonStatus.forEach((item) => {
        item.addEventListener("click", () => {
            const status = item.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}
// End button status

// From seach
const fromSearch = document.querySelector("#form-search");
if (fromSearch) {
    let url = new URL(window.location.href)
    fromSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;



    })
}
// End From search

// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    let url = new URL(window.location.href)

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")


            url.searchParams.set("page", page);
            window.location.href = url.href;

        })
    })
}
// END pagination

// Checkbox-multi
const checkBoxmulti = document.querySelector("[checkbox-multi]")
if (checkBoxmulti) {
    const inputCheckAll = checkBoxmulti.querySelector("input[name='checkall']");

    const inputsId = checkBoxmulti.querySelectorAll("input[name='id']")

    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxmulti.querySelectorAll("input[name='id']:checked").length;

            // console.log(countChecked);
            // console.log(inputsId.length);

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// End Checkbox-multi

// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        const typeChange = e.target.elements.type.value;
        e.preventDefault();

        const checkBoxmulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkBoxmulti.querySelectorAll("input[name='id']:checked");

        console.log(inputsChecked);

        if (inputsChecked.length > 0) {
            let ids = []

            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(input => {
                const id = input.value;

                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // console.log(`${id}-${position}`);

                    ids.push(`${id}-${position}`)
                } else {
                    ids.push(id);
                }


            })

            // console.log(ids.join(", "))

            inputIds.value = ids.join(", ")

            formChangeMulti.submit();

        } else {
            alert("Vui lòng chọn ít nhất 1 bảng ghi")
        }
    })
}
// End Form change multi

// show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    },time)
}
// End show alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const updateImageInput = document.querySelector("[upload-image-input]")
    const updateImagePreview = document.querySelector("[upload-image-preview]")
    updateImageInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    
    if (file) {
        updateImagePreview.src = URL.createObjectURL(file);
    }
});
}
//End Upload Image
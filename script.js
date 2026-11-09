const serviceName = "ChooseYourContent";
let isSubscribed = false;
let submitCount = 0;

function makeSubscribeMessage(email, subscribed) {
    if (subscribed == true){
        return email + "로 신청이 완료되었습니다.";
    }
    return "이메일을 입력한 뒤 신청해주세요.";
}

const subscribeForm = document.querySelector("#subscribeForm");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");

function handleSubscribe(event) {
    event.preventDefault();

    const subscriberEmail = emailInput.value.trim();

    if (subscriberEmail === ""){
        subscribeMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }
    isSubscribed = true;
    submitCount += 1;

    subscribeMessage.textContent = makeSubscribeMessage(subscriberEmail,isSubscribed);

    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;
}

subscribeForm.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const agreeCheck = document.querySelector("#agree-check");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

const form = document.querySelector("#agree-form");

const submitStatus = document.querySelector("#submit-status");
const forceSaveFailure = new URLSearchParams(location.search).has("save-error");
let isSubmitting = false;


function handleThemeClick(){
    const isDark = document.body.classList.toggle("dark");
    themeButton.textContent = isDark ? "라이트 모드로 바꾸기" : "다크 모드로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleAgreeChange(){
    const agreed = agreeCheck.checked;
    startButton.disabled = !agreed;
    agreeMessage.textContent = agreed ? "찜 목록 작성을 시작할 수 있습니다." : "동의 후 찜 목록 작성을 시작할 수 있습니다.";

    if (agreed) {
        agreeMessage.classList.add("is-ready");
    } else{
        agreeMessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels(){
    tabs.forEach(function(tab){
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
    });
    panels.forEach(function(panel){
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
}

function activateTab(clickedTab){
    const targetSelector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetSelector);

    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected", "true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event){
    resetTabsAndPanels();
    activateTab(event.currentTarget);
}

tabs.forEach(function(tab){
    tab.addEventListener("click", handleTabClick);
});

const selectFlow = document.querySelector("#select-flow");
const flowSteps = selectFlow.querySelectorAll(".step");
const progressItems = selectFlow.querySelectorAll(".progress-item");
const titleInput = document.querySelector("#content-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const selectCategory = document.querySelector("#select-category");
const categoryOptions = document.querySelector("#category-options");
const categoryInputs = document.querySelectorAll('input[name = "category"]');
const prevOption = document.querySelector("#prev-option");
const nextOption = document.querySelector("#next-option");
const prevSummary = document.querySelector("#prev-summary");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryTitle = document.querySelector("#summary-title");
const summaryType = document.querySelector("#summary-type");
const summaryCategory = document.querySelector("#summary-category");

const formData = {
    title: "", type: "영화", selectcategory: false, category: ""
};

const wantList = document.querySelector("#want-list")
const listNameInput = document.querySelector("#list-name");
const nameInfo = document.querySelector(".name-info");
const nameError = document.querySelector("#name-error");
const nameField = document.querySelector("#name-field");
const nameHelp = document.querySelector("#name-help");
const nameCount = document.querySelector("#name-count");
const makeList = document.querySelector("#make-list");
const editList = document.querySelector(".edit-list");
const showList = document.querySelector("#show-list");
const editListName = document.querySelector("#edit-listname");
const editName = document.querySelector(".edit-name");
const editNameConfirm = document.querySelector("#edit-name-confirm");
const editNameCancel = document.querySelector("#edit-name-cancel");
const nameBlock = document.querySelector("#name-block");
const wantListAdd = document.querySelector(".want-list-add");
const titleInfo = document.querySelector(".title-info");
const titleBlock = document.querySelector("#title-block")
const editTitle = document.querySelector("#edit-title");
const editTitleAction = document.querySelector(".edit-title-action");
const editTitleConfirm = document.querySelector("#edit-title-confirm");
const editTitleCancel = document.querySelector("#edit-title-cancel");
const setCategory = document.querySelector("#setcategory");
const wantListDetail = document.querySelector(".want-list-detail");
const putCategory = document.querySelector("#putcategory");
const categoryList = document.querySelector("#category-list");
const contentCategory = document.querySelectorAll('input[name = "content-category"]');
const addContent = document.querySelector("#addcontent");
const contentSummary = document.querySelector(".content-summary");
const listcontentTitle = document.querySelector("#lctitle");
const listcontentType = document.querySelector("#lctype");
const listcontentCategory = document.querySelector("#lccategory");
const rewriteList = document.querySelector("#rewrite-list");
const chooseContent = document.querySelector("#choose-content");

const chooseList = document.querySelector("#choose-list");
const choosingLabel = document.createElement("label");
const wantlistList = document.createElement("input");

let setListName = "";

const contentData = {title: "", type: "movie", category:[]};

const infoDialog = document.querySelector("#info-dialog");
const infoCancel = document.querySelector("#info-cancel");
const infoConfirm = document.querySelector("#info-confirm");
const finalConfirm = document.createElement("button");

function revokeInfoAgreement() {
    agreeCheck.checked = false;
    selectFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

function saveStatus() {
    try{
        localStorage.setItem("agreed", String(agreeCheck.checked));
        return true;
    } catch{
        return false;
    }
}

function agreedState() {
    agreeCheck.hidden = true;
    agreeMessage.hidden = true;
    startButton.hidden = true;
    const agreeRow = document.querySelector(".agree-row");
    agreeRow.textContent = "정보 수집 및 활용에 동의했습니다.";
    wantList.hidden = false;
}

startButton.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    infoDialog.showModal();
});
infoCancel.addEventListener("click", () => {
    infoDialog.close();
    revokeInfoAgreement();
});
infoDialog.addEventListener("cancel", revokeInfoAgreement);

function setSubmitState(state, message) {
    isSubmitting = state == "loading";
    form.setAttribute("aria-busy", String(isSubmitting));
    infoConfirm.disabled = state;
    infoConfirm.textContent = state ? "저장하는 중..." : "동의하고 작성 시작하기";
    submitStatus.textContent = message;
    submitStatus.classList.toggle("is-success", state === "success");
    submitStatus.classList.toggle("has-error", state === "error");
}

function wait(milliseconds) {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function persistAgreement() {
    await wait(600);

    if(forceSaveFailure) {
    throw new Error("수업용 저장 실패");
  }

  if(!saveStatus()) {
    throw new Error("브라우저 저장 실패");
  }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    setSubmitState(true, "동의 여부를 저장하고 있습니다.");

    try{
        await persistAgreement();
        submitStatus.textContent = "동의 여부 저장을 완료하였습니다.";
        setSubmitState(false, "동의 여부 저장 완료");
        const infoDescription = document.getElementById("info-description");
        const dialogActions = document.querySelector(".dialog-actions");
        const dialogBttnRemove = dialogActions.querySelectorAll(":not(.submit-status)");

        infoDescription.textContent = "동의가 확인되었습니다. 감사합니다.";
        dialogBttnRemove.forEach(child => child.remove());
        finalConfirm.id = "final-confirm";
        finalConfirm.className = "final-confirm";
        finalConfirm.textContent = "완료";
        finalConfirm.type = "button";
        
        finalConfirm.addEventListener("click", () => {
            infoDialog.close();
            finalConfirm.classList.add("confirmed");
        
            if(finalConfirm.classList.contains("confirmed") === true){
                localStorage.setItem("confirmed", "true");
            }
        
            agreedState();
            wantList.scrollIntoView({behavior: "smooth"});
            listNameInput.focus();
        });
        dialogActions.appendChild(finalConfirm);

    }
    catch{
        setSubmitState(false, "저장하지 못했습니다. 다시 시도해주세요.")
    }
})

window.addEventListener("DOMContentLoaded", () => {
    const agreed = localStorage.getItem("agreed");
    const confirmed = localStorage.getItem("confirmed");

    if(agreed && agreed === confirmed){
        agreedState();
    }
})

function updateNameExperience() {
    const length = listNameInput.value.length;
    const valid = listNameInput.value.trim().length >= 2;
    const hasError =titleInput.getAttribute("aria-invalid") === "true";

    nameCount.textContent = `${length} / 30자`;
    nameField.classList.toggle("has-error", hasError);
    nameField.classList.toggle("is-valid", valid && !hasError);
    nameHelp.textContent = hasError
        ? "제목 입력 조건을 다시 확인해주세요."
        :valid
            ? "입력 조건을 충족했습니다."
    : "2자 이상 30자 이하로 입력해주세요."
}

function validateName() {
    const notBlankName = listNameInput.value.trim();
    if (!notBlankName) {
        nameError.textContent = "이름을 입력해 주세요.";
        listNameInput.setAttribute("aria-invalid", "true");
        updateNameExperience();
        listNameInput.focus();
        return false;
    }
    if(notBlankName.length<2) {
        nameError.textContent = "목록 이름은 2자 이상 입력해주세요.";
        listNameInput.setAttribute("aria-invalid", "true");
        updateNameExperience();
        listNameInput.focus();
        return false;
    }
    nameError.textContent = "";
    listNameInput.removeAttribute("aria-invalid");
    updateNameExperience();
    setListName = notBlankName;
    return true;
}

listNameInput.addEventListener("input", () => {
    if(listNameInput.getAttribute("aria-invalid") === "true"){
        validateName();
    }else{
        updateNameExperience();
    }
});
updateNameExperience();

makeList.addEventListener("click", () => {
    if(!validateName()) return;
    nameField.classList.remove("is-valid", "has-error");
    updateNameExperience();
    listNameInput.hidden = true;
    nameHelp.hidden = true;
    nameCount.hidden = true;
    nameBlock.hidden = false;
    nameBlock.textContent = setListName;
    nameInfo.hidden = true;
    makeList.hidden = true;
    editList.hidden = false;
});

editListName.addEventListener("click", () => {
    nameBlock.hidden = true;
    nameField.classList.remove("is-valid", "has-error");
    updateNameExperience();
    listNameInput.hidden = false;
    listNameInput.value = nameBlock.textContent;
    nameHelp.hidden = false;
    nameCount.hidden = false;
    listNameInput.focus();
    editList.hidden = true;
    editName.hidden = false;
    nameInfo.hidden = false;
});

function makeNameBlock(){
    listNameInput.hidden = true;
    nameHelp.hidden = true;
    nameCount.hidden = true;
    nameBlock.hidden = false;
    nameInfo.hidden = true;
    editName.hidden = true;
    editList.hidden = false;
    nameBlock.textContent = setListName;
}
editNameConfirm.addEventListener("click", () => {
    if(!validateName()) return;
    makeNameBlock();
});

editNameCancel.addEventListener("click", () => {
    nameError.textContent = "";
    makeNameBlock();
});

showList.addEventListener("click", () => {
    editList.hidden = true;
    wantListAdd.hidden = false;
    contentSummary.hidden = true;
    wantListAdd.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
});

function showStep(index) {
    flowSteps.forEach((step, i) => {step.hidden = i !== index;} );
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "콘텐츠 제목을 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    contentData.title = value;
    return true;
}

setCategory.addEventListener("click", () => {
    if(!validateTitle()) return;
    titleBlock.textContent = contentData.title;
    titleInput.hidden = true;
    titleBlock.hidden = false;
    titleInfo.hidden = true;
    editTitle.hidden = false;
    wantListDetail.hidden = false;
    setCategory.hidden = true;
    wantListDetail.scrollIntoView({behavior: "smooth"});
});

editTitle.addEventListener("click", () => {
    titleInput.value = titleBlock.textContent;
    titleInput.hidden = false;
    titleBlock.hidden = true;
    titleInput.focus();
    editTitleAction.hidden = false;
    editTitle.hidden = true;
});

function makeTitleBlock(){
    titleBlock.textContent = contentData.title;
    titleInput.hidden = true;
    titleBlock.hidden = false;
    editTitleAction.hidden = true;
    editTitle.hidden = false;
}

editTitleConfirm.addEventListener("click", ()=> {
    if(!validateTitle()) return;
    makeTitleBlock();
});

editTitleCancel.addEventListener("click", () => {
    titleError.textContent = "";
    makeTitleBlock();
});

function syncPutCategoryFields() {
    const listopen = putCategory.checked;
    putCategory.setAttribute("aria-expanded", String(open));
    categoryList.hidden = !listopen;
    if(!listopen){
        contentCategory.forEach((input)=> {
            input.checked = false;
        });
    }
}

putCategory.addEventListener("change", syncPutCategoryFields);
syncPutCategoryFields();



addContent.addEventListener("click", () => {
    if(!validateTitle()) return;
    const howLong = document.querySelector('input[name = "howlong"]:checked');
    contentData.type = howLong.value;
    const selectedContentCategory = document.querySelectorAll('input[name = "content-category"]:checked');
    selectedContentCategory.forEach((el) => {
        contentData.category.push(el.value);
    });

    listcontentTitle.textContent = contentData.title;
    listcontentType.textContent = contentData.type;
    listcontentCategory.textContent = contentData.category.length == 0 ? "선택 안함" : contentData.category.join(", ");
    
    editList.hidden = false;
    showList.hidden = true;
    contentSummary.hidden = false;
    wantListAdd.hidden = true;
    chooseContent.hidden = false;
    contentSummary.scrollIntoView({behavior: "smooth"});
    addContent.textContent = "콘텐츠 정보 수정하기";
});

rewriteList.addEventListener("click", () => {
    contentData.category.length = 0;
    wantListAdd.hidden = false;
    contentSummary.hidden = true;
    chooseContent.hidden = true;
    setCategory.scrollIntoView({behavior: "smooth"});
});

chooseContent.addEventListener("click", () => {
    wantList.hidden = true;
    selectFlow.hidden = false;
    showStep(0);
    selectFlow.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
    chooseList.appendChild(choosingLabel);
    wantlistList.type = "radio";
    wantlistList.name= "list";
    wantlistList.value = setListName;
    const labelText = document.createTextNode(setListName);
    choosingLabel.appendChild(wantlistList);
    choosingLabel.appendChild(labelText);
    wantlistList.checked = true;
    wantlistList.focus();

});

titleNext.addEventListener("click", () => {
    formData.title = wantlistList.value;
    showStep(1);
});

function syncCategoryFields() {
    const open = selectCategory.checked;
    selectCategory.setAttribute("aria-expanded", String(open));
    categoryOptions.hidden = !open;
    categoryInputs.forEach((input)=> {
        input.disabled = !open;
    });
}

selectCategory.addEventListener("change", syncCategoryFields);
syncCategoryFields();

prevOption.addEventListener("click", () => showStep(0));
nextOption.addEventListener("click", () => {
    const typetag = document.querySelector('input[name = "group"]:checked');
    formData.type = typetag.value;
    formData.selectcategory = selectCategory.checked;
    const count = document.querySelector('input[name = "category"]:checked');
    formData.category = count.value;
    summaryTitle.textContent = formData.title;
    summaryType.textContent = formData.type;
    summaryCategory.textContent = formData.selectcategory ? formData.category + "" : "미포함";
    showStep(2);
});

prevSummary.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.type = "movie";
    formData.selectcategory = false;
    formData.category = "";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    document.querySelector('input[name="group"][value="영화"]').checked = true;
    selectCategory.checked = false;
    categoryOptions.hidden = true;
    document.querySelector('input[name="category"][value="일상"]').checked = true;
    summaryTitle.textContent = "";
    summaryType.textContent = "";
    summaryCategory.textContent = "";
    showStep(0);
});

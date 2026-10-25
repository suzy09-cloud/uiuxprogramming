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
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agree-check");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick(){
    const isDark = document.body.classList.toggle("dark");
    themeButton.textContent = isDark ? "라이트 모드로 바꾸기" : "다크 모드로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput(){
    const maxLength = nicknameInput.maxLength;
    const currentLength = Math.min(nicknameInput.value.length, maxLength);
    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

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
const typeCheck = document.querySelector("#typecheck");
const selectCategory = document.querySelector("#select-category");
const categoryOptions = document.querySelector("#category-options");
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
const listSetting = document.querySelector(".list-setting");
const nameInfo = document.querySelector(".name-info");
const nameError = document.querySelector("#name-error");
const makeList = document.querySelector("#make-list");
const editList = document.querySelector(".edit-list");
const showList = document.querySelector("#show-list");
const editListName = document.querySelector("#edit-listname");
const editName = document.querySelector(".edit-name");
const editNameConfirm = document.querySelector("#edit-name-confirm");
const editNameCancel = document.querySelector("#edit-name-cancel");
const nameBlock = document.createElement("div");
const listNewName = document.createElement("input");
const wantListAdd = document.querySelector(".want-list-add");
const titleInfo = document.querySelector(".title-info");
const titleBlock = document.createElement("p");
const Newtitle = document.createElement("input");
const editTitle = document.querySelector("#edit-title");
const editTitleAction = document.querySelector(".edit-title-action");
const editTitleConfirm = document.querySelector("#edit-title-confirm");
const editTitleCancel = document.querySelector("#edit-title-cancel");
const setCategory = document.querySelector("#setcategory");
const wantListDetail = document.querySelector(".want-list-detail");
const putCategory = document.querySelector("#putcategory");
const categoryList = document.querySelector("#category-list");
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

function revokeInfoAgreement() {
    agreeCheck.checked = false;
    selectFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
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
infoConfirm.addEventListener("click", () => {
    if(!agreeCheck.checked) return;
    infoDialog.close();
    agreeCheck.hidden = true;
    agreeMessage.hidden = true;
    startButton.hidden = true;
    const agreeRow = document.querySelector(".agree-row");
    agreeRow.textContent = "정보 수집 및 활용에 동의했습니다."
    wantList.hidden = false;
    wantList.scrollIntoView({behavior: "smooth"});
    listNameInput.focus();
});

function validateName() {
    const listName = document.getElementById("list-name");
    const notBlankName = listName.value.trim();
    if (!notBlankName) {
        nameError.textContent = "이름을 입력해 주세요.";
        listName.classList.add("has-error");
        listName.focus();
        return false;
    }
    nameError.textContent = "";
    listName.classList.remove("has-error");
    setListName = notBlankName;
    return true;
}

makeList.addEventListener("click", () => {
    if(!validateName()) return;
    nameBlock.id = "name-block";
    nameBlock.textContent = setListName;
    listNameInput.replaceWith(nameBlock);
    nameInfo.hidden = true;
    makeList.hidden = true;
    editList.hidden = false;
});

editListName.addEventListener("click", () => {
    listNewName.id = "list-name";
    listNewName.type = "text";
    listNewName.placeholder = "예: 넷플릭스";
    listNewName.setAttribute("aria-describedby", "name-error");
    nameBlock.replaceWith(listNewName);
    listNewName.focus();
    editList.hidden = true;
    editName.hidden = false;
    nameInfo.hidden = false;
});

function makeNameBlock(){
    nameBlock.id = "name-block";
    nameBlock.textContent = setListName;
    listNewName.replaceWith(nameBlock);
    nameInfo.hidden = true;
    editName.hidden = true;
    editList.hidden = false;
}
editNameConfirm.addEventListener("click", () => {
    if(!validateName()) return;
    makeNameBlock();
});

editNameCancel.addEventListener("click", () => {makeNameBlock();});

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
    const content = document.getElementById("content-title");
    const value = content.value.trim();
    if (!value) {
        titleError.textContent = "콘텐츠 제목을 입력해 주세요.";
        content.classList.add("has-error");
        content.focus();
        return false;
    }
    titleError.textContent = "";
    content.classList.remove("has-error");
    contentData.title = value;
    return true;
}

setCategory.addEventListener("click", () => {
    if(!validateTitle()) return;
    titleBlock.id = "title-block";
    titleBlock.textContent = contentData.title;
    titleInput.replaceWith(titleBlock);
    titleInfo.hidden = true;
    editTitle.hidden = false;
    wantListDetail.hidden = false;
    setCategory.hidden = true;
    wantListDetail.scrollIntoView({behavior: "smooth"});
});

editTitle.addEventListener("click", () => {
    Newtitle.id = "content-title";
    Newtitle.type = "text";
    Newtitle.placeholder = "예: 죠죠의 기묘한 모험";
    Newtitle.setAttribute("aria-describedby", "title-error");
    titleBlock.replaceWith(Newtitle);
    Newtitle.focus();
    editTitleAction.hidden = false;
    editTitle.hidden = true;
});

function makeTitleBlock(){
    titleBlock.id = "title-block";
    titleBlock.textContent = contentData.title;
    Newtitle.replaceWith(titleBlock);
    editTitleAction.hidden = true;
    editTitle.hidden = false;
}

editTitleConfirm.addEventListener("click", ()=> {
    if(!validateTitle()) return;
    makeTitleBlock();
});

editTitleCancel.addEventListener("click", () => {makeTitleBlock();});

putCategory.addEventListener("change", () => {
    categoryList.hidden = !putCategory.checked;
    categoryList.focus();
});

addContent.addEventListener("click", () => {
    const howLong = document.querySelector('input[name = "howlong"]:checked');
    contentData.type = howLong.value;
    const selectedContentCategory = document.querySelectorAll('input[name = "content-category"]:checked');
    selectedContentCategory.forEach((el) => {
        contentData.category.push(el.value);
    });
    listcontentTitle.textContent = contentData.title;
    listcontentType.textContent = contentData.type;
    listcontentCategory.textContent = contentData.category.length == !0 ? contentData.category + " " : "선택 안함";
    
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
selectCategory.addEventListener("change", () => {
    categoryOptions.hidden = !selectCategory.checked;
});
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

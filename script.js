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

const addlistFlow = document.querySelector("#addlist-flow");
const flowSteps = addlistFlow.querySelectorAll(".step");
const progressItems = addlistFlow.querySelectorAll(".progress-item");
const titleInput = document.querySelector("#content-title");
const titleError = document.querySelector("#title-error");
const titleNext = document.querySelector("#title-next");
const typeCheck = document.querySelector("#typecheck");
const addCategory = document.querySelector("#addcategory");
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
    title: "", type: "movie", addcategory: false, category: ""
};

function showStep(index) {
    flowSteps.forEach((step, i) => {step.hidden = i !== index;} );
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const infoDialog = document.querySelector("#info-dialog");
const infoCancel = document.querySelector("#info-cancel");
const infoConfirm = document.querySelector("#info-confirm");

function revokeInfoAgreement() {
    agreeCheck.checked = false;
    addlistFlow.hidden = true;
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
    addlistFlow.hidden = false;
    showStep(0);
    addlistFlow.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
});

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
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if(!validateTitle()) return;
    showStep(1);
});
addCategory.addEventListener("change", () => {
    categoryOptions.hidden = !addCategory.checked;
});
prevOption.addEventListener("click", () => showStep(0));
nextOption.addEventListener("click", () => {
    const typetag = document.querySelector('input[name = "group"]:checked');
    formData.type = typetag.value;
    formData.addcategory = addCategory.checked;
    const count = document.querySelector('input[name = "category"]:checked');
    formData.category = count.value;
    summaryTitle.textContent = formData.title;
    summaryType.textContent = formData.type;
    summaryCategory.textContent = formData.addcategory ? formData.category + "" : "미포함";
    showStep(2);
});
prevSummary.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));
restartButton.addEventListener("click", () => {
    formData.title = "";
    formData.type = "movie";
    formData.addcategory = false;
    formData.category = "";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    document.querySelector('input[name="group"][value="영화"]').checked = true;
    addCategory.checked = false;
    categoryOptions.hidden = true;
    document.querySelector('input[name="category"][value="일상"]').checked = true;
    summaryTitle.textContent = "";
    summaryType.textContent = "";
    summaryCategory.textContent = "";
    showStep(0);
});
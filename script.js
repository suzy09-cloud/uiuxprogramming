const navLinks = document.querySelectorAll(".main-nav a");
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

const themeButton = document.querySelector("#themeButton");
const agreeCheck = document.querySelector("#agree-check");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

const form = document.querySelector("#agree-form");

const submitStatus = document.querySelector("#submit-status");
const forceSaveFailure = new URLSearchParams(location.search).has("save-error");
let isSubmitting = false;

function updateCurrentNav(){
    const currentHash = window.location.hash;

    navLinks.forEach((link) => {
        const current = currentHash
            ?link.getAttribute("href")===currentHash
            :link === navLinks[0];

        link.classList.toggle("is-current", current);

        if(current) {
            link.setAttribute("aria-current", "page");
        }
        else{
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("hashchange", updateCurrentNav);
updateCurrentNav();

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.textContent = "메뉴 열기";
        menuToggle.setAttribute("aria-expanded", "false");
    })
})

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

const wantList = document.querySelector("#want-list");
const nameForm = document.querySelector("#name-form");
const listNameInput = document.querySelector("#list-name");
const nameInfo = document.querySelector(".name-info");
const nameError = document.querySelector("#name-error");
const nameField = document.querySelector("#name-field");
const nameHelp = document.querySelector("#name-help");
const nameCount = document.querySelector("#name-count");
const makeList = document.querySelector("#make-list");
const editList = document.querySelector(".edit-list");
const showList = document.querySelector("#show-list");
const closeList = document.querySelector("#close-list");
const editListName = document.querySelector("#edit-listname");
const editName = document.querySelector(".edit-name");
const editNameConfirm = document.querySelector("#edit-name-confirm");
const editNameCancel = document.querySelector("#edit-name-cancel");
const nameBlock = document.querySelector("#name-block");
const nameBlockText = document.querySelector("#name-block-text");
const wantListAdd = document.querySelector(".want-list-add");
const titleInfo = document.querySelector(".title-info");
const titleSetting = document.querySelector(".title-setting");
const titleBlock = document.querySelector("#title-block");
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
const addConfirm = document.querySelector("#addconfirm");
const newContent = document.querySelector("#newcontent");
const contentSummary = document.querySelector(".content-summary");
const listcontentTitle = document.querySelector("#lctitle");
const listcontentType = document.querySelector("#lctype");
const listcontentCategory = document.querySelector("#lccategory");
const contentNextMove = document.querySelector(".content-next-move");
const rewriteList = document.querySelector("#rewrite-list");
const goToList = document.querySelector("#gotolist");
const chooseContent = document.querySelector("#choose-content");

const storageKey = "choose-content-contents-v1";
const contentForm = document.querySelector("#content-form");
const contentList = document.querySelector("#content-list");
const emptyState = document.querySelector("#empty-state");
const contentCount = document.querySelector("#content-count");
const contentArchive = document.querySelector("#content-archive");
const archiveStatus = document.querySelector("#archive-status");
const goToAdd = document.querySelector("#gotoadd");

const filterButtons = document.querySelectorAll(".filter-button");
let currentFilter = "all";

const chooseList = document.querySelector("#choose-list");
const choosingLabel = document.createElement("label");
const wantlistList = document.createElement("input");

let setListName = "";

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

function saveName() {
     try{
        localStorage.setItem("listName", setListName);
        return true;
    } catch{
        return false;
    }
}

function agreedState() {
    const wantListNav = document.querySelector("#want-list-nav");
    const selectFlowNav = document.querySelector("#select-flow-nav");
    wantListNav.hidden = false;
    selectFlowNav.hidden = false;
    agreeCheck.hidden = true;
    agreeMessage.hidden = true;
    startButton.hidden = true;
    const agreeRow = document.querySelector(".agree-row");
    agreeRow.textContent = "정보 수집 및 활용에 동의했습니다.";
    wantList.hidden = false;
    selectFlow.hidden = false;
    showStep(0);
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
});

window.addEventListener("DOMContentLoaded", () => {
    const agreed = localStorage.getItem("agreed");
    const confirmed = localStorage.getItem("confirmed");

    if(agreed && agreed === confirmed){
        agreedState();
    }

    const savedName = localStorage.getItem("listName");

    if(savedName){
        showSavedName();
    }
});

function updateNameExperience() {
    const length = listNameInput.value.length;
    const valid = listNameInput.value.trim().length >= 2;
    const hasError =titleInput.getAttribute("aria-invalid") === "true";

    nameCount.textContent = `${length} / 15자`;
    nameField.classList.toggle("has-error", hasError);
    nameField.classList.toggle("is-valid", valid && !hasError);
    nameHelp.textContent = hasError
        ? "제목 입력 조건을 다시 확인해주세요."
        :valid
            ? "입력 조건을 충족했습니다."
    : "2자 이상 15자 이하로 입력해주세요."
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
    saveName();
    nameField.classList.remove("is-valid", "has-error");
    updateNameExperience();
    listNameInput.hidden = true;
    nameHelp.hidden = true;
    nameCount.hidden = true;
    nameBlock.hidden = false;
    nameBlockText.textContent = setListName;
    nameInfo.hidden = true;
    makeList.hidden = true;
    editList.hidden = false;
    closeList.hidden = true;
    choosingLabel.id = setListName;
    chooseList.appendChild(choosingLabel);
    wantlistList.type = "radio";
    wantlistList.name= "list";
    wantlistList.value = setListName;
    const labelText = document.createTextNode(setListName);
    choosingLabel.appendChild(wantlistList);
    choosingLabel.appendChild(labelText);
    wantlistList.checked = true;
});

editListName.addEventListener("click", () => {
    nameBlock.hidden = true;
    nameField.classList.remove("is-valid", "has-error");
    updateNameExperience();
    listNameInput.hidden = false;
    listNameInput.value = nameBlockText.textContent;
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
    nameBlockText.textContent = setListName;
    saveName();
}

function showSavedName() {
    const savedName = localStorage.getItem("listName");

    setListName = savedName;
    listNameInput.hidden = true;
    nameHelp.hidden = true;
    nameCount.hidden = true;
    nameBlock.hidden = false;
    nameBlockText.textContent = setListName;
    nameInfo.hidden = true;
    makeList.hidden = true;
    editList.hidden = false;
    closeList.hidden = true;
    choosingLabel.id = setListName;
    chooseList.appendChild(choosingLabel);
    wantlistList.type = "radio";
    wantlistList.name= "list";
    wantlistList.value = setListName;
    const labelText = document.createTextNode(setListName);
    choosingLabel.appendChild(wantlistList);
    choosingLabel.appendChild(labelText);
    wantlistList.checked = true;
}

editNameConfirm.addEventListener("click", () => {
    if(!validateName()) return;
    makeNameBlock();
    chooseList.firstChild.textContent = "";
    choosingLabel.id = setListName;
    chooseList.appendChild(choosingLabel);
    wantlistList.type = "radio";
    wantlistList.name= "list";
    wantlistList.value = setListName;
    const labelText = document.createTextNode(setListName);
    choosingLabel.appendChild(wantlistList);
    choosingLabel.appendChild(labelText);
    wantlistList.checked = true;
});

editNameCancel.addEventListener("click", () => {
    nameError.textContent = "";
    makeNameBlock();
});

showList.addEventListener("click", () => {
    showList.hidden = true;
    closeList.hidden = false;
    contentArchive.hidden = false;
    contentArchive.scrollIntoView({behavior: "smooth"});
});

closeList.addEventListener("click", () => {
    wantListAdd.hidden = true;
    contentSummary.hidden = true;
    showList.hidden = false;
    closeList.hidden = true;
    contentArchive.hidden = true;
});

goToAdd.addEventListener("click", () => {

    contentForm.reset();
    titleInput.value = "";
    titleInput.hidden = false;
    titleBlock.textContent = "";
    titleBlock.hidden = true;
    editTitle.hidden =true;
    setCategory.hidden =false;
    putCategory.checked = false;
    categoryList.hidden = true;
    addContent.textContent = "찜 목록에 콘텐츠 추가하기";
    document.querySelector("#complete-message").textContent = "콘텐츠를 다음 내용으로 추가하시겠습니까?";
    titleSetting.hidden = false;
    wantListDetail.hidden = true;
    contentSummary.hidden = true;
    
    contentNextMove.hidden = true;
    wantListAdd.hidden = false;
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
    return true;
}

function readContents() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter((content) => content && typeof content.id === "string" && typeof content.title === "string")
      .map((content) => ({
        id: content.id,
        title: content.title,
        type: ["영화", "시리즈", ].includes(content.type) ? content.type : "영화",
        detailcheck: content.detailcheck === true,
        category: Array.isArray(content.category)
          ? content.category.filter((item) => typeof item === "string")
          : [],
      }));
  } catch {
    return [];
  }
}

let contents = readContents();

function saveContent() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(contents));
    return true;
  } catch {
    return false;
  }
}

function getFormValues() {
    const checkedCategories = putCategory.checked
    ? Array.from(contentForm.querySelectorAll('input[name="content-category"]:checked')).map(el => el.value)
    : [];
  return {
    title: titleInput.value.trim(),
    type: contentForm.querySelector('input[name = "howlong"]:checked')?.value || '영화',
    detailcheck: putCategory.checked,
    category: checkedCategories
};
}

function createText(tag, className, content) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
}

function getVisibleContents() {
    return contents.filter((content)=>{
        if(currentFilter === "all") return true;
        if(currentFilter === "movie") return content.type === "영화";
        if(currentFilter === "series") return content.type === "시리즈"
        return true;
    })
}

function renderContents() {
  const visibleContents = getVisibleContents();

  contentList.replaceChildren();
  emptyState.hidden = visibleContents.length !== 0;
  contentList.hidden = visibleContents.length === 0;

  const emptyTitle = emptyState.querySelector("h3");
  const emptyDescription = emptyState.querySelector("p");
  
  if(visibleContents.length === 0){
      const filtered = currentFilter !== "all";
      emptyTitle.textContent = filtered
        ? "선택한 종류의 콘텐츠가 없어요."
        :"아직 저장된 콘텐츠가 없어요.";
      emptyDescription.textContent = filtered
        ? "다른 종류를 선택해보세요."
        : "첫 콘텐츠를 목록에 추가하면 이곳에서 다시 볼 수 있습니다.";
  };

  chooseContent.hidden = contents.length === 0;
  document.querySelector("#select-flow-nav"). hidden = contents.length === 0;
  selectFlow.hidden = contents.length === 0;

  contentCount.textContent = String(visibleContents.length);
  contentCount.setAttribute("aria-label", `현재 표시 중인 콘텐츠 ${visibleContents.length}개`);

  visibleContents.forEach((content) => {
    const card = document.createElement("li");
    card.className = "content-card";
    const top = document.createElement("div");
    top.className = "content-card-top";
    card.append(top);
    card.append(createText("h3", "content-title-text", content.title));
    const hasCategories = content.detailcheck && Array.isArray(content.category) && content.category.length > 0;
    const categoryText = hasCategories ? content.category.join(", ") : "설정 안함";
    card.append(createText("p", "content-info", `${content.type} · ${categoryText}`));

    const actions = document.createElement("div");
    actions.className = "content-actions";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "삭제";
    deleteButton.setAttribute("aria-label", `${content.title} 삭제`);

    deleteButton.addEventListener("click", () => {
      deleteContent(content.id);
    });

    actions.append(deleteButton);
    card.append(actions);

    contentList.append(card);
  });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", ()=>{
        currentFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const selected = item === button;
            item.classList.toggle("is-active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });
        renderContents();
    });
});

function deleteContent(id) {
  const target = contents.find((item) => item.id === id);
  if (!target) return;

  const isConfirmed = confirm(`"${target.title}" 콘텐츠를 정말 삭제하시겠습니까?`);
  if (!isConfirmed) return;

  contents = contents.filter((item) => item.id !== id);
  saveContent();
  renderContents();
  archiveStatus.textContent = `"${target.title}" 콘텐츠를 삭제했습니다.`;
}

setCategory.addEventListener("click", () => {
    if(!validateTitle()) return;
    const values = getFormValues();
    titleBlock.textContent = values.title;
    titleInput.hidden = true;
    titleBlock.hidden = false;
    titleInfo.hidden = true;
    editTitle.hidden = false;
    wantListDetail.hidden = false;
    setCategory.hidden = true;
    wantListDetail.scrollIntoView({behavior: "smooth"});
});

editTitle.addEventListener("click", () => {
    const values = getFormValues();
    titleInput.value = values.title;
    titleInput.hidden = false;
    titleBlock.hidden = true;
    titleInput.focus();
    editTitleAction.hidden = false;
    editTitle.hidden = true;
});

function makeTitleBlock(){
    const values = getFormValues();
    titleBlock.textContent = values.title;
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

function updateSummary() {
  const values = getFormValues();
  listcontentTitle.textContent = values.title;
  listcontentType.textContent = `${values.type}`;
  listcontentCategory.textContent = values.category.length === 0 ? "선택 안함" : values.category.join(", ");
}

addContent.addEventListener("click", () => {
    if(!validateTitle()) return;

    updateSummary();
    
    titleSetting.hidden = true;
    wantListDetail.hidden = true;
    editList.hidden = false;
    showList.hidden = true;
    contentSummary.hidden = false;
    document.querySelector(".list-confirm").hidden = false;
    chooseContent.hidden = false;
    contentSummary.scrollIntoView({behavior: "smooth"});
});

rewriteList.addEventListener("click", () => {
    addContent.textContent = "콘텐츠 정보 수정하기";
    titleSetting.hidden = false;
    wantListDetail.hidden = false;
    contentSummary.hidden = true;
    setCategory.scrollIntoView({behavior: "smooth"});
});

newContent.addEventListener("click", () => {
    contentForm.reset();
    titleInput.value = "";
    titleInput.hidden = false;
    titleBlock.textContent = "";
    titleBlock.hidden = true;
    editTitle.hidden =true;
    setCategory.hidden =false;
    putCategory.checked = false;
    categoryList.hidden = true;
    addContent.textContent = "찜 목록에 콘텐츠 추가하기";
    document.querySelector("#complete-message").textContent = "콘텐츠를 다음 내용으로 추가하시겠습니까?";
    titleSetting.hidden = false;
    wantListDetail.hidden = true;
    contentSummary.hidden = true;
    
    contentNextMove.hidden = true;
    titleInfo.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
});

addConfirm.addEventListener("click", (event) => {
    event.preventDefault();
    const content = {
        id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        ...getFormValues(),
        cancelled: false,
        createdAt: new Date().toISOString()
    };
    contents.unshift(content);
    const persisted = saveContent();
    renderContents();
    archiveStatus.textContent = persisted
        ? " 아래 목록에서 콘텐츠 내용을 다시 확인할 수 있습니다."
        : "콘텐츠 내용을 현재 화면에 저장했습니다. 브라우저 저장 공간을 사용할 수 없어 새로고침하면 사라질 수 있습니다.";
    document.querySelector("#complete-message").textContent = "저장된 내용은 내 콘텐츠 보기에서도 확인할 수 있습니다.";
    document.querySelector(".list-confirm").hidden = true;
    contentNextMove.hidden = false;
});

goToList.addEventListener("click", () => {
    contentArchive.scrollIntoView({behavior: "smooth"});
    wantListAdd.hidden = true;
});

renderContents();



chooseContent.addEventListener("click", () => {
    selectFlow.scrollIntoView({behavior: "smooth"});
    const listList = document.querySelector(`#choose-list > input`)
    listList.focus();
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
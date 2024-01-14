// Languajes enum
const LANGS = {
    EN : "en",
    ES : "es"
}
var currentLanguage = '';
var languageSelector = document.querySelector("#language-selector");

function TranslatePage(translations) {
    var localizableElements = document.querySelectorAll('[loc-key]');
    if (!localizableElements) {
        return;
    }

    // Translate all page
    localizableElements.forEach((element) => {
        let key = element.getAttribute('loc-key');
        let localizedText = translations[key];

        if (localizedText === undefined) {
            localizedText = "NO-KEY-" + key;
        }
        element.innerText = localizedText;
    });

    // Update curriculum direction based on language
    var curriculumButton = document.querySelector('#download-curriculum-button');
    if (curriculumButton) {
        if (currentLanguage == LANGS.ES) {
            curriculumButton.href = 'assets/curriculum/TaylorSeguraVindas - CurriculumEspañol.pdf';
        } else if (currentLanguage == LANGS.EN) {
            curriculumButton.href = 'assets/curriculum/TaylorSeguraVindas - CurriculumEnglish.pdf';
        }
    }
    console.log(curriculumButton);
}

function UpdateLocalization() {
    var filePath = "";

    // Find file
    if (currentLanguage === LANGS.ES) {
        filePath = "./localization/es.json";
    } else if (currentLanguage === LANGS.EN) {
        filePath = "./localization/en.json";
    } else {
        return;
    }

    fetch(filePath)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        TranslatePage(data);
    });
}

// Update current language and update texts
function ChangeLanguage(newLanguage) {
    // Prevent changing the language to the current language
    if (currentLanguage === newLanguage) {
        return;
    }

    currentLanguage = newLanguage;
    UpdateLocalization();
}

function InitLanguage() {
    // TODO: Get browser's language
    ChangeLanguage(LANGS.EN);
    languageSelector.value = LANGS.EN;
}

function OnLanguageChanged() {
    ChangeLanguage(languageSelector.value);
}

function CreateLanguageOption(displayText, value) {
    var option = document.createElement("option");
    option.innerHTML = displayText;
    option.value = value;

    languageSelector.appendChild(option);
}

function ConnectLanguageSelector() {
    if (!languageSelector) {
        return;
    }

    languageSelector.addEventListener("change", OnLanguageChanged);
    
    // Fill options
    CreateLanguageOption('English', LANGS.EN);
    CreateLanguageOption('Español', LANGS.ES);
}

ConnectLanguageSelector();
InitLanguage();
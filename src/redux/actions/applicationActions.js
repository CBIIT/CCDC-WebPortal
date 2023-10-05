import * as types from "./actionTypes";
import * as applicationApi from "../../api/applicationApi";

export function loadApplicationVersionInfoSuccess(versionInfo) {
    return { type: types.LOAD_APPLICATION_VERSION_INFO_SUCCESS, versionInfo };
}

export function loadWidgetUpdatesSuccess(widgetUpdates) {
    return { type: types.LOAD_WIDGET_UPDATE_SUCCESS, widgetUpdates };
}

export function loadSiteUpdatesSuccess(siteUpdates) {
    return { type: types.LOAD_SITE_UPDATE_SUCCESS, siteUpdates };
}

export function addSiteUpdatesSuccess(siteUpdates) {
    return { type: types.ADD_SITE_UPDATE_SUCCESS, siteUpdates };
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo};
}

export function loadGlossaryTermsSuccess(glossaryTerms) {
  return { type: types.LOAD_GLOSSARY_TERMS_SUCCESS, glossaryTerms};
}

export function loadGlossaryTermsByFirstLetterSuccess(firstLetterList) {
  return { type: types.LOAD_GLOSSARY_BY_FIRST_LETTER_SUCCESS, firstLetterList};
}

export function loadGlossaryLettersSuccess(glossaryLetters) {
    return { type: types.LOAD_GLOSSARY_LETTERS_SUCCESS, glossaryLetters};
  }

export function loadApplicationVersionInfo() {
  const func = function func(dispatch) {
      return applicationApi.getApplicationVersionInfo()
      .then(result => {
          dispatch(loadApplicationVersionInfoSuccess(result.data));
      })
      .catch(error => {
          throw error;
      });
  };
  return func;
}

export function loadWidgetUpdates() {
    const func = function func(dispatch) {
        return applicationApi.getWidgetUpdates()
        .then(result => {
            dispatch(loadWidgetUpdatesSuccess(result.data));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function loadSiteUpdates(pageInfo) {
    const func = function func(dispatch) {
        return applicationApi.getSiteUpdates(pageInfo)
        .then(result => {
            dispatch(loadSiteUpdatesSuccess(result.data));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function addSiteUpdates(pageInfo) {
    const func = function func(dispatch) {
        return applicationApi.getSiteUpdates(pageInfo)
        .then(result => {
            dispatch(addSiteUpdatesSuccess(result.data));
            return result;
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function pageSelect(pageInfo) {
    const func = function func(dispatch) {
        dispatch(switchPage(pageInfo));
    };
    return func;
}

export function loadGlossaryTerms(termNames) {
    const func = function func(dispatch) {
        return applicationApi.getGlossaryTerms(termNames)
        .then(result => {
            dispatch(loadGlossaryTermsSuccess(result.definitions));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function loadGlossaryTermsByFirstLetter(firstLetter) {
    const func = function func(dispatch) {
        return applicationApi.getGlossaryTerms(firstLetter)
        .then(result => {
            dispatch(loadGlossaryTermsByFirstLetterSuccess(result.terms));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}

export function loadGlossaryLetters() {
    const func = function func(dispatch) {
        return applicationApi.getGlossaryLetters()
        .then(result => {
            dispatch(loadGlossaryLettersSuccess(result.letters));
        })
        .catch(error => {
            throw error;
        });
    };
    return func;
}
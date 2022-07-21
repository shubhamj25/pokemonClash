import React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import LocaleData from './json/strings.json'
import ar from 'react-intl/locale-data/ar'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'
import es from 'react-intl/locale-data/es'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'
import ja from 'react-intl/locale-data/ja'
import ko from 'react-intl/locale-data/ko'
import pl from 'react-intl/locale-data/pl'
import pt from 'react-intl/locale-data/pt'
import ru from 'react-intl/locale-data/ru'
import th from 'react-intl/locale-data/th'
import tr from 'react-intl/locale-data/tr'
import vi from 'react-intl/locale-data/vi'
import zh from 'react-intl/locale-data/zh'

import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/fr'
import 'moment/locale/de'
import 'moment/locale/es'
import 'moment/locale/it'
import 'moment/locale/ja'
import 'moment/locale/ko'
import 'moment/locale/pl'
import 'moment/locale/pt'
import 'moment/locale/ru'
import 'moment/locale/th'
import 'moment/locale/tr'
import 'moment/locale/vi'
import 'moment/locale/zh-cn'

const DEFAULT_LANGUAGE = 'en'

class LocaleProvider extends React.Component {
  static propTypes = {};

  constructor() {
    super()

    this.state = Object.assign({}, { strings: this.getStrings() })
  }

  getStrings = () => {
    addLocaleData([
      ...ar,
      ...en,
      ...de,
      ...es,
      ...fr,
      ...ja,
      ...it,
      ...ko,
      ...pl,
      ...pt,
      ...ru,
      ...th,
      ...tr,
      ...vi,
      ...zh,
    ])
    let urlParams = new URLSearchParams(window.location.search)
    let language = urlParams.get('locale')

    console.log('navigator.languages', navigator.languages)
    console.log('navigator.language', navigator.language)
    if (language == null || language === '') {
      language =
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage
    }
    if (language == null || language === '') {
      language = 'en'
    }
    // Split locales with a region code
    let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
    // Try full locale, fallback to locale without region code
    let _computedStrings =
      LocaleData[languageWithoutRegionCode] || LocaleData[language]

    //fallback to en
    if (_computedStrings == null) {
      _computedStrings = LocaleData.en
      languageWithoutRegionCode = DEFAULT_LANGUAGE
    }
    // Set the strings
    let strings = Object.assign(LocaleData[DEFAULT_LANGUAGE], _computedStrings)

    window.userLocale = languageWithoutRegionCode
    moment.locale(window.userLocale)
    return strings
  };

  render = () => {
    return (
      <IntlProvider
        key={window.userLocale}
        locale={window.userLocale}
        defaultLocale={DEFAULT_LANGUAGE}
        messages={this.state.strings}
      >
        {this.props.children}
      </IntlProvider>
    )
  };
}

export default LocaleProvider

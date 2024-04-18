export interface ITranslationModel{
    q: string,
    source: Languages,
    target: Languages,
    format: FormatType,
}

export interface ITranslationTextResponseModel{
    detectedLanguage: IDetectedLanguage,
    translatedText: string
}

export interface IDetectedLanguage{
    confidence: number,
    language: Languages
}

export enum Languages {
    auto = 'auto',
    ar = 'ar',
    az = 'az',
    bg = 'bg',
    bn = 'bn',
    ca = 'ca',
    cs = 'cs',
    da = 'da',
    de = 'de',
    el = 'el',
    en = 'en',
    eo = 'eo',
    es = 'es',
    et = 'et',
    fa = 'fa',
    fi = 'fi',
    fr = 'fr',
    ga = 'ga',
    he = 'he',
    hi = 'hi',
    hu = 'hu',
    id = 'id',
    it = 'it',
    ja = 'ja',
    ko = 'ko',
    lt = 'lt',
    lv = 'lv',
    ms = 'ms',
    nb = 'nb',
    nl = 'nl',
    pl = 'pl',
    pt = 'pt',
    ro = 'ro',
    ru = 'ru',
    sk = 'sk',
    sl = 'sl',
    sq = 'sq',
    sv = 'sv',
    th = 'th',
    tl = 'tl',
    tr = 'tr',
    uk = 'uk',
    zh = 'zh',
    zt = 'zt'
}

export enum FormatType {
    text = 'text',
    file = 'file'
}
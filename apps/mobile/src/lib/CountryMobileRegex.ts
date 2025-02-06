interface ICOUNTRIESPROPS {
  [key: string]: string;
}

export interface CountryInfo {
  shortcode: string;
  name: string;
  dialcode: string;
}

export const defaultCountry = {
  shortcode: "in",
  name: "India",
  dialcode: "+91",
};

export function validateCountryMobileNumber (
  countryIsoCode: string,
  phoneNumber: string
){
  const regex = new RegExp(COUNTRY_MOBILE_REGEX?.[countryIsoCode]);
  return regex.test(phoneNumber) ?? false;
};

export function getCurrentCountryObj  (
  countryIsoCode: string
) {
  const countryObj = countriesPhoneList.find((country) => country.shortcode === countryIsoCode);
  return countryObj ?? defaultCountry;
};

export const COUNTRY_MOBILE_REGEX: ICOUNTRIESPROPS = {
  af: "^(\\+93)[789][0-9]{8}$", // Afghanistan (mandatory +93, 9 digits)
  ax: "^(\\+358)[0-9]{4,13}$", // Åland Islands (mandatory +358, 4-13 digits)
  al: "^(\\+355)[6-9][0-9]{7,8}$", // Albania (mandatory +355, 8-9 digits)
  dz: "^(\\+213)[567][0-9]{8}$", // Algeria (mandatory +213, 9 digits)
  as: "^(\\+1)[567][0-9]{7}$", // American Samoa (mandatory +1, 7 digits)
  ad: "^(\\+376)[346][0-9]{6}$", // Andorra (mandatory +376, 7 digits)
  ao: "^(\\+244)[2-9][0-9]{7}$", // Angola (mandatory +244, 8 digits)
  ai: "^(\\+1)[264][0-9]{7}$", // Anguilla (mandatory +1, 7 digits)
  aq: "^(\\+672)[0-9]{4,15}$", // Antarctica (mandatory +672, 4-15 digits)
  ag: "^(\\+1)[268][0-9]{7}$", // Antigua and Barbuda (mandatory +1, 7 digits)
  ar: "^(\\+54)[9][0-9]{8,10}$", // Argentina (mandatory +54, 8-10 digits)
  am: "^(\\+374)[0-9]{8}$", // Armenia (mandatory +374, 8 digits)
  aw: "^(\\+297)[5-9][0-9]{6}$", // Aruba (mandatory +297, 7 digits)
  au: "^(\\+61)[45678][0-9]{8}$", // Australia (mandatory +61, 9 digits)
  at: "^(\\+43)[0-9]{10}$", // Austria (mandatory +43, 10 digits)
  az: "^(\\+994)[5-9][0-9]{8}$", // Azerbaijan (mandatory +994, 9 digits)
  bs: "^(\\+1)[242][0-9]{7}$", // Bahamas (mandatory +1, 7 digits)
  bh: "^(\\+973)[3678][0-9]{6}$", // Bahrain (mandatory +973, 7 digits)
  bd: "^(\\+880)[0-9]{10}$", // Bangladesh (mandatory +880, 10 digits)
  bb: "^(\\+1)[246][0-9]{7}$", // Barbados (mandatory +1, 7 digits)
  by: "^(\\+375)[0-9]{9}$", // Belarus (mandatory +375, 9 digits)
  be: "^(\\+32)[456789][0-9]{6,7}$", // Belgium (mandatory +32, 7-8 digits)
  bz: "^(\\+501)[6][0-9]{6}$", // Belize (mandatory +501, 7 digits)
  bj: "^(\\+229)[29][0-9]{6}$", // Benin (mandatory +229, 8 digits)
  bm: "^(\\+1)[441][0-9]{7}$", // Bermuda (mandatory +1, 7 digits)
  bt: "^(\\+975)[17][0-9]{7}$", // Bhutan (mandatory +975, 8 digits)
  bo: "^(\\+591)[2467][0-9]{6,7}$", // Bolivia (Plurinational State of) (mandatory +591, 7-8 digits)
  bq: "^(\\+599)[78][0-9]{6,7}$", // Bonaire, Sint Eustatius and Saba (mandatory +599, 7 digits)
  ba: "^(\\+387)[3456][0-9]{7}$", // Bosnia and Herzegovina (mandatory +387, 8 digits)
  bw: "^(\\+267)[71][0-9]{6}$", // Botswana (mandatory +267, 7 digits)
  // bv: "", // Bouvet Island (No mobile network on Bouvet Island)
  br: "^(\\+55)[1-9][0-9]{10}$", // Brazil (mandatory +55, 11 digits)
  io: "^(\\+246)[1-9][0-9]{6}$", // British Indian Ocean Territory (mandatory +246, 7 digits)
  bn: "^(\\+673)[7][0-9]{7}$", // Brunei Darussalam (mandatory +673, 8 digits)
  bg: "^(\\+359)[2-9][0-9]{6,7}$", // Bulgaria (mandatory +359, 7-8 digits)
  bf: "^(\\+226)[6-7][0-9]{6}$", // Burkina Faso (mandatory +226, 7 digits)
  bi: "^(\\+257)[79][0-9]{7}$", // Burundi (mandatory +257, 8 digits)
  cv: "^(\\+238)[5-9][0-9]{6}$", // Cabo Verde (mandatory +238, 7 digits)
  kh: "^(\\+855)[1-9][0-9]{7,8}$", // Cambodia (mandatory +855, 8-9 digits)
  cm: "^(\\+237)[2-7][0-9]{7,8}$", // Cameroon (mandatory +237, 8-9 digits)
  ca: "^(\\+1)[2-9][0-9]{9}$", // Canada (mandatory +1, 10 digits)
  ky: "^(\\+1)[345][0-9]{7}$", // Cayman Islands (mandatory +1, 7 digits)
  cf: "^(\\+236)[0-9]{8}$", // Central African Republic (mandatory +236, 8 digits)
  td: "^(\\+235)[6-7][0-9]{6}$", // Chad (mandatory +235, 7 digits)
  cl: "^(\\+56)[9][0-9]{8}$", // Chile (mandatory +56, 9 digits)
  cn: "^(\\+86)[1-9][0-9]{10,11}$", // China (mandatory +86, 11 digits)
  cx: "^(\\+61)[8][0-9]{6,9}$", // Christmas Island (mandatory +61, 7-10 digits)
  cc: "^(\\+61)[4][0-9]{6}$", // Cocos (Keeling) Islands (mandatory +61, 7 digits)
  co: "^(\\+57)[3][0-9]{8}$", // Colombia (mandatory +57, 9 digits)
  km: "^(\\+269)[1-3][0-9]{7}$", // Comoros (mandatory +269, 8 digits)
  cg: "^(\\+242)[0-9]{8}$", // Congo (mandatory +242, 8 digits)
  cd: "^(\\+243)[1-9][0-9]{8}$", // Congo (Democratic Republic of the) (mandatory +243, 9 digits)
  ck: "^(\\+682)[7][0-9]{6}$", // Cook Islands (mandatory +682, 7 digits)
  cr: "^(\\+506)[5-8][0-9]{6,7}$", // Costa Rica (mandatory +506, 7-8 digits)
  ci: "^(\\+225)[0-9]{8}$", // Cote dIvoire (mandatory +225, 8 digits)
  hr: "^(\\+385)[1-9][0-9]{7,8}$", // Croatia (mandatory +385, 8-9 digits)
  cu: "^(\\+53)[1-9][0-9]{7}$", // Cuba (mandatory +53, 8 digits)
  cw: "^(\\+599)[9][0-9]{6}$", // Curaçao (mandatory +599, 7 digits)
  cy: "^(\\+357)[2469][0-9]{6,7}$", // Cyprus (mandatory +357, 7-8 digits)
  cz: "^(\\+420)[1-9][0-9]{8,12}$", // Czech Republic (mandatory +420, 9-13 digits)
  dk: "^(\\+45)[2-9][0-9]{6,7}$", // Denmark (mandatory +45, 7-8 digits)
  dj: "^(\\+253)[7][0-9]{6}$", // Djibouti (mandatory +253, 7 digits)
  dm: "^(\\+1)[767][0-9]{7}$", // Dominica (mandatory +1, 7 digits)
  do: "^(\\+1)[809246829][0-9]{6}$", // Dominican Republic (mandatory +1, 7 digits)
  ec: "^(\\+593)[59][0-9]{7,8}$", // Ecuador (mandatory +593, 8-9 digits)
  eg: "^(\\+20)[1-9][0-9]{8,10}$", // Egypt (mandatory +20, 10 digits)
  sv: "^(\\+503)[6-7][0-9]{7}$", // El Salvador (mandatory +503, 8 digits)
  gq: "^(\\+240)[222][0-9]{6}$", // Equatorial Guinea (mandatory +240, 8 digits)
  er: "^(\\+291)[7][0-9]{6}$", // Eritrea (mandatory +291, 7 digits)
  ee: "^(\\+372)[5-8][0-9]{6,7}$", // Estonia (mandatory +372, 7-8 digits)
  et: "^(\\+251)[91][0-9]{8}$", // Ethiopia (mandatory +251, 9 digits)
  fk: "^(\\+500)[56][0-9]{6}$", // Falkland Islands (Malvinas) (mandatory +500, 7 digits)
  fo: "^(\\+298)[2][0-9]{6}$", // Faroe Islands (mandatory +298, 7 digits)
  fj: "^(\\+679)[7][0-9]{6}$", // Fiji (mandatory +679, 7 digits)
  fi: "^(\\+358)[456][0-9]{6,7}$", // Finland (mandatory +358, 7-8 digits)
  fr: "^(\\+33)[6-9][0-9]{8}$", // France (mandatory +33, 9 digits)
  gf: "^(\\+594)[6][0-9]{7}$", // French Guiana (mandatory +594, 8 digits)
  pf: "^(\\+689)[4-7][0-9]{6}$", // French Polynesia (mandatory +689, 7 digits)
  tf: "^(\\+262)[269][0-9]{6}$", // French Southern Territories (mandatory +262, 7 digits)
  ga: "^(\\+241)[0-9]{8}$", // Gabon (mandatory +241, 8 digits)
  gm: "^(\\+220)[7][0-9]{6}$", // Gambia (mandatory +220, 7 digits)
  ge: "^(\\+995)[5-9][0-9]{7,8}$", // Georgia (mandatory +995, 8-9 digits)
  de: "^(\\+49)[1-9][0-9]{7,13}$", // Germany (mandatory +49, 8-14 digits)
  gh: "^(\\+233)[2][0-9]{8}$", // Ghana (mandatory +233, 9 digits)
  gi: "^(\\+350)[5-8][0-9]{6}$", // Gibraltar (mandatory +350, 7 digits)
  gr: "^(\\+30)[1-9][0-9]{9}$", // Greece (mandatory +30, 10 digits)
  gl: "^(\\+299)[2-6][0-9]{5}$", // Greenland (mandatory +299, 6 digits)
  gd: "^(\\+1)[473][0-9]{7}$", // Grenada (mandatory +1, 7 digits)
  gp: "^(\\+590)[6-9][0-9]{7}$", // Guadeloupe (mandatory +590, 8 digits)
  gu: "^(\\+1)[671][0-9]{7}$", // Guam (mandatory +1, 7 digits)
  gt: "^(\\+502)[456][0-9]{6,7}$", // Guatemala (mandatory +502, 7-8 digits)
  gg: "^(\\+44)[1481][0-9]{6,7}$", // Guernsey (mandatory +44, 7-8 digits)
  gn: "^(\\+224)[6-7][0-9]{7}$", // Guinea (mandatory +224, 8 digits)
  gw: "^(\\+245)[5][0-9]{6}$", // Guinea-Bissau (mandatory +245, 7 digits)
  gy: "^(\\+592)[6-7][0-9]{6}$", // Guyana (mandatory +592, 7 digits)
  ht: "^(\\+509)[3-4][0-9]{7,8}$", // Haiti (mandatory +509, 8-9 digits)
  // hm: "", // Heard Island and McDonald Islands (No mobile network on Heard Island and McDonald Islands)
  va: "^(\\+379)[0-9]{10}$", // Holy See (mandatory +379, 10 digits)
  hn: "^(\\+504)[2-9][0-9]{7}$", // Honduras (mandatory +504, 8 digits)
  hk: "^(\\+852)[5-9][0-9]{7}$", // Hong Kong (mandatory +852, 8 digits)
  hu: "^(\\+36)[20][0-9]{8}$", // Hungary (mandatory +36, 9 digits)
  is: "^(\\+354)[4-6][0-9]{6}$", // Iceland (mandatory +354, 7 digits)
  in: "^(\\+91)[6789][0-9]{9}$", // India (mandatory +91, 10 digits)
  id: "^(\\+62)[2-9][0-9]{7,11}$", // Indonesia (mandatory +62, 8-12 digits)
  ir: "^(\\+98)[9][0-9]{9,10}$", // Iran (Islamic Republic of) (mandatory +98, 10-11 digits)
  iq: "^(\\+964)[78][0-9]{8,9}$", // Iraq (mandatory +964, 9-10 digits)
  ie: "^(\\+353)[8][0-9]{8}$", // Ireland (mandatory +353, 9 digits)
  im: "^(\\+44)[1624][0-9]{6}$", // Isle of Man (mandatory +44, 7 digits)
  il: "^(\\+972)[5][0-9]{8}$", // Israel (mandatory +972, 9 digits)
  it: "^(\\+39)[345678][0-9]{8}$", // Italy (mandatory +39, 9 digits)
  jm: "^(\\+1)[876][0-9]{7}$", // Jamaica (mandatory +1, 7 digits)
  jp: "^(\\+81)[80][0-9]{8,9}$", // Japan (mandatory +81, 9-10 digits)
  je: "^(\\+44)[1534][0-9]{6}$", // Jersey (mandatory +44, 7 digits)
  jo: "^(\\+962)[7][0-9]{7,8}$", // Jordan (mandatory +962, 8-9 digits)
  kz: "^(\\+7)[7-8][0-9]{9}$", // Kazakhstan (mandatory +7, 10 digits)
  ke: "^(\\+254)[7][0-9]{8}$", // Kenya (mandatory +254, 9 digits)
  ki: "^(\\+686)[9][0-9]{5}$", // Kiribati (mandatory +686, 6 digits)
  kp: "^(\\+850)[1-9][0-9]{8,11}$", // Korea (Democratic People's Republic of) (mandatory +850, 9-12 digits)
  kr: "^(\\+82)[1-9][0-9]{8,10}$", // Korea (Republic of) (mandatory +82, 9-11 digits)
  kw: "^(\\+965)[5-9][0-9]{6,7}$", // Kuwait (mandatory +965, 7-8 digits)
  kg: "^(\\+996)[7][0-9]{8}$", // Kyrgyzstan (mandatory +996, 9 digits)
  la: "^(\\+856)[20][0-9]{7,8}$", // Lao People's Democratic Republic (mandatory +856, 8-9 digits)
  lv: "^(\\+371)[2-7][0-9]{7}$", // Latvia (mandatory +371, 8 digits)
  lb: "^(\\+961)[3-81][0-9]{6,7}$", // Lebanon (mandatory +961, 7-8 digits)
  ls: "^(\\+266)[5-7][0-9]{6}$", // Lesotho (mandatory +266, 7 digits)
  lr: "^(\\+231)[4-7][0-9]{6}$", // Liberia (mandatory +231, 7 digits)
  ly: "^(\\+218)[9][0-9]{7,8}$", // Libya (mandatory +218, 8-9 digits)
  li: "^(\\+423)[6][0-9]{7}$", // Liechtenstein (mandatory +423, 7 digits)
  lt: "^(\\+370)[6-7][0-9]{6,7}$", // Lithuania (mandatory +370, 7-8 digits)
  lu: "^(\\+352)[2-9][0-9]{6}$", // Luxembourg (mandatory +352, 7 digits)
  mo: "^(\\+853)[6][0-9]{7}$", // Macao (mandatory +853, 7 digits)
  mk: "^(\\+389)[2-7][0-9]{6,7}$", // Macedonia (the former Yugoslav Republic of) (mandatory +389, 7-8 digits)
  mg: "^(\\+261)[20][0-9]{6,7}$", // Madagascar (mandatory +261, 7-8 digits)
  mw: "^(\\+265)[1-9][0-9]{7,8}$", // Malawi (mandatory +265, 8-9 digits)
  my: "^(\\+60)[1-9][0-9]{7,9}$", // Malaysia (mandatory +60, 8-10 digits)
  mv: "^(\\+960)[7-9][0-9]{6}$", // Maldives (mandatory +960, 7 digits)
  ml: "^(\\+223)[67][0-9]{7}$", // Mali (mandatory +223, 8 digits)
  mt: "^(\\+356)[79][0-9]{6,7}$", // Malta (mandatory +356, 7-8 digits)
  mh: "^(\\+692)[23567][0-9]{5}$", // Marshall Islands (mandatory +692, 7 digits)
  mq: "^(\\+596)[696][0-9]{6}$", // Martinique (mandatory +596, 7 digits)
  mr: "^(\\+222)[2-3][0-9]{6}$", // Mauritania (mandatory +222, 8 digits)
  mu: "^(\\+230)[2-7][0-9]{6}$", // Mauritius (mandatory +230, 7 digits)
  yt: "^(\\+262)[639][0-9]{6}$", // Mayotte (mandatory +262, 7 digits)
  mx: "^(\\+52)[1-9][0-9]{9,10}$", // Mexico (mandatory +52, 10-11 digits)
  fm: "^(\\+691)[7][0-9]{6}$", // Micronesia (Federated States of) (mandatory +691, 7 digits)
  md: "^(\\+373)[6-8][0-9]{6,7}$", // Moldova (Republic of) (mandatory +373, 7-8 digits)
  mc: "^(\\+377)[45][0-9]{6}$", // Monaco (mandatory +377, 7 digits)
  mn: "^(\\+976)[56789][0-9]{6,7}$", // Mongolia (mandatory +976, 7-8 digits)
  me: "^(\\+382)[67][0-9]{6}$", // Montenegro (mandatory +382, 7 digits)
  ms: "^(\\+1)[664][0-9]{7}$", // Montserrat (mandatory +1, 7 digits)
  ma: "^(\\+212)[6-7][0-9]{8}$", // Morocco (mandatory +212, 9 digits)
  mz: "^(\\+258)[2-6][0-9]{6,7}$", // Mozambique (mandatory +258, 7-8 digits)
  mm: "^(\\+95)[1-9][0-9]{8}$", // Myanmar (mandatory +95, 9 digits)
  na: "^(\\+264)[60][0-9]{6}$", // Namibia (mandatory +264, 7 digits)
  nr: "^(\\+674)[5][0-9]{6}$", // Nauru (mandatory +674, 7 digits)
  np: "^(\\+977)[7-9][0-9]{8}$", // Nepal (mandatory +977, 9 digits)
  nl: "^(\\+31)[6][0-9]{8}$", // Netherlands (mandatory +31, 9 digits)
  nc: "^(\\+687)[7-9][0-9]{6}$", // New Caledonia (mandatory +687, 7 digits)
  nz: "^(\\+64)[27][0-9]{7,8}$", // New Zealand (mandatory +64, 8-9 digits)
  ni: "^(\\+505)[8][0-9]{7}$", // Nicaragua (mandatory +505, 8 digits)
  ne: "^(\\+227)[6-7][0-9]{6}$", // Niger (mandatory +227, 7 digits)
  ng: "^(\\+234)[789][0-9]{9}$", // Nigeria (mandatory +234, 10 digits)
  nu: "^(\\+683)[4-7][0-9]{5}$", // Niue (mandatory +683, 7 digits)
  nf: "^(\\+672)[3][0-9]{4}$", // Norfolk Island (mandatory +672, 5 digits)
  mp: "^(\\+1)[670][0-9]{7}$", // Northern Mariana Islands (mandatory +1, 7 digits)
  no: "^(\\+47)[4-8][0-9]{7,8}$", // Norway (mandatory +47, 8-9 digits)
  om: "^(\\+968)[7][0-9]{7}$", // Oman (mandatory +968, 8 digits)
  pk: "^(\\+92)[3456789][0-9]{8}$", // Pakistan (mandatory +92, 9 digits)
  pw: "^(\\+680)[1-9][0-9]{6}$", // Palau (mandatory +680, 7 digits)
  ps: "^(\\+970)[5][0-9]{7}$", // Palestine, State of (mandatory +970, 8 digits)
  pa: "^(\\+507)[6-8][0-9]{7}$", // Panama (mandatory +507, 8 digits)
  pg: "^(\\+675)[7][0-9]{7}$", // Papua New Guinea (mandatory +675, 8 digits)
  py: "^(\\+595)[9][0-9]{8}$", // Paraguay (mandatory +595, 9 digits)
  pe: "^(\\+51)[9][0-9]{8}$", // Peru (mandatory +51, 9 digits)
  ph: "^(\\+63)[9][0-9]{9}$", // Philippines (mandatory +63, 10 digits)
  pn: "^(\\+64)[56][0-9]{6}$", // Pitcairn (mandatory +64, 7 digits)
  pl: "^(\\+48)[5-7][0-9]{8,9}$", // Poland (mandatory +48, 9-10 digits)
  pt: "^(\\+351)[2-9][0-9]{7,8}$", // Portugal (mandatory +351, 8-9 digits)
  pr: "^(\\+1)[787][0-9]{7}$", // Puerto Rico (mandatory +1, 7 digits)
  qa: "^(\\+974)[33-77][0-9]{6}$", // Qatar (mandatory +974, 8 digits)
  re: "^(\\+262)[692][0-9]{6}$", // Réunion (mandatory +262, 7 digits)
  ro: "^(\\+40)[7][0-9]{8}$", // Romania (mandatory +40, 9 digits)
  ru: "^(\\+7)[3-7][0-9]{9}$", // Russian Federation (mandatory +7, 10 digits)
  rw: "^(\\+250)[7-9][0-9]{7,8}$", // Rwanda (mandatory +250, 8-9 digits)
  bl: "^(\\+590)[690][0-9]{6}$", // Saint Barthélemy (mandatory +590, 7 digits)
  sh: "^(\\+290)[1-3][0-9]{4}$", // Saint Helena, Ascension and Tristan da Cunha (mandatory +290, 5 digits)
  kn: "^(\\+1)[869][0-9]{7}$", // Saint Kitts and Nevis (mandatory +1, 7 digits)
  lc: "^(\\+1)[758][0-9]{7}$", // Saint Lucia (mandatory +1, 7 digits)
  mf: "^(\\+590)[6][0-9]{7}$", // Saint Martin (French part) (mandatory +590, 8 digits)
  pm: "^(\\+508)[555][0-9]{5}$", // Saint Pierre and Miquelon (mandatory +508, 6 digits)
  vc: "^(\\+1)[784][0-9]{7}$", // Saint Vincent and the Grenadines (mandatory +1, 7 digits)
  ws: "^(\\+685)[7-8][0-9]{5,6}$", // Samoa (mandatory +685, 6-7 digits)
  sm: "^(\\+378)[6-9][0-9]{7}$", // San Marino (mandatory +378, 7 digits)
  st: "^(\\+239)[98][0-9]{6}$", // Sao Tome and Principe (mandatory +239, 7 digits)
  sa: "^(\\+966)[5][0-9]{8}$", // Saudi Arabia (mandatory +966, 9 digits)
  sn: "^(\\+221)[7-9][0-9]{7}$", // Senegal (mandatory +221, 8 digits)
  rs: "^(\\+381)[6-7][0-9]{6,8}$", // Serbia (mandatory +381, 7-9 digits)
  sc: "^(\\+248)[2-5][0-9]{5,6}$", // Seychelles (mandatory +248, 6-7 digits)
  sl: "^(\\+232)[2-6][0-9]{6,7}$", // Sierra Leone (mandatory +232, 7-8 digits)
  sg: "^(\\+65)[8-9][0-9]{7,8}$", // Singapore (mandatory +65, 8-9 digits)
  sx: "^(\\+1)[721][0-9]{7}$", // Sint Maarten (Dutch part) (mandatory +1, 7 digits)
  sk: "^(\\+421)[9][0-9]{8}$", // Slovakia (mandatory +421, 9 digits)
  si: "^(\\+386)[4-5][0-9]{6,7}$", // Slovenia (mandatory +386, 7-8 digits)
  sb: "^(\\+677)[5-7][0-9]{4}$", // Solomon Islands (mandatory +677, 6 digits)
  so: "^(\\+252)[7][0-9]{7}$", // Somalia (mandatory +252, 8 digits)
  za: "^(\\+27)[789][0-9]{8}$", // South Africa (mandatory +27, 9 digits)
  gs: "^(\\+500)[5-6][0-9]{5}$", // South Georgia and the South Sandwich Islands (mandatory +500, 7 digits)
  ss: "^(\\+211)[9][0-9]{7,8}$", // South Sudan (mandatory +211, 8-9 digits)
  es: "^(\\+34)[67][0-9]{8}$", // Spain (mandatory +34, 9 digits)
  lk: "^(\\+94)[7-9][0-9]{8}$", // Sri Lanka (mandatory +94, 9 digits)
  sd: "^(\\+249)[9][0-9]{7,8}$", // Sudan (mandatory +249, 8-9 digits)
  sr: "^(\\+597)[6-7][0-9]{6}$", // Suriname (mandatory +597, 7 digits)
  sj: "^(\\+47)[79][0-9]{5}$", // Svalbard and Jan Mayen (mandatory +47, 7 digits)
  sz: "^(\\+268)[76][0-9]{6}$", // Swaziland (mandatory +268, 7 digits)
  se: "^(\\+46)[7-9][0-9]{7,10}$", // Sweden (mandatory +46, 8-11 digits)
  ch: "^(\\+41)[7-9][0-9]{8}$", // Switzerland (mandatory +41, 9 digits)
  sy: "^(\\+963)[9][0-9]{8}$", // Syrian Arab Republic (mandatory +963, 9 digits)
  tw: "^(\\+886)[2-9][0-9]{7,8}$", // Taiwan, Province of China (mandatory +886, 8-9 digits)
  tj: "^(\\+992)[37][0-9]{7,8}$", // Tajikistan (mandatory +992, 8-9 digits)
  tz: "^(\\+255)[67][0-9]{7,8}$", // Tanzania, United Republic of (mandatory +255, 8-9 digits)
  th: "^(\\+66)[689][0-9]{7,8}$", // Thailand (mandatory +66, 8-9 digits)
  tl: "^(\\+670)[7][0-9]{6}$", // Timor-Leste (mandatory +670, 7 digits)
  tg: "^(\\+228)[9][0-9]{7}$", // Togo (mandatory +228, 8 digits)
  tk: "^(\\+690)[1-9][0-9]{4}$", // Tokelau (mandatory +690, 5 digits)
  to: "^(\\+676)[2-6][0-9]{5}$", // Tonga (mandatory +676, 6 digits)
  tt: "^(\\+1)[868][0-9]{7}$", // Trinidad and Tobago (mandatory +1, 7 digits)
  tn: "^(\\+216)[2-5][0-9]{7}$", // Tunisia (mandatory +216, 8 digits)
  tr: "^(\\+90)[5-7][0-9]{8}$", // Turkey (mandatory +90, 9 digits)
  tm: "^(\\+993)[6-7][0-9]{6}$", // Turkmenistan (mandatory +993, 7 digits)
  tc: "^(\\+1)[649][0-9]{7}$", // Turks and Caicos Islands (mandatory +1, 7 digits)
  tv: "^(\\+688)[9][0-9]{4}$", // Tuvalu (mandatory +688, 5 digits)
  ug: "^(\\+256)[7-9][0-9]{8,9}$", // Uganda (mandatory +256, 9-10 digits)
  ua: "^(\\+380)[39][0-9]{7,8}$", // Ukraine (mandatory +380, 8-9 digits)
  ae: "^(\\+971)[5][0-9]{8}$", // United Arab Emirates (mandatory +971, 9 digits)
  gb: "^(\\+44)[23478][0-9]{8,9}$", // United Kingdom of Great Britain and Northern Ireland (mandatory +44, 9-10 digits)
  us: "^(\\+1)[2-9][0-9]{9}$", // United States of America (mandatory +1, 10 digits)
  // um: "", // United States Minor Outlying Islands (No mobile network on United States Minor Outlying Islands)
  uy: "^(\\+598)[9][0-9]{8}$", // Uruguay (mandatory +598, 9 digits)
  uz: "^(\\+998)[35789][0-9]{7}$", // Uzbekistan (mandatory +998, 9 digits)
  vu: "^(\\+678)[5-7][0-9]{5}$", // Vanuatu (mandatory +678, 7 digits)
  ve: "^(\\+58)[4-6][0-9]{7,9}$", // Venezuela (Bolivarian Republic of) (mandatory +58, 8-10 digits)
  vn: "^(\\+84)[8-9][0-9]{7,10}$", // Viet Nam (mandatory +84, 8-11 digits)
  vg: "^(\\+1)[284][0-9]{7}$", // Virgin Islands (British) (mandatory +1, 7 digits)
  vi: "^(\\+1)[340][0-9]{7}$", // Virgin Islands (U.S.) (mandatory +1, 7 digits)
  wf: "^(\\+681)[5][0-9]{5}$", // Wallis and Futuna (mandatory +681, 6 digits)
  // eh: "", // Western Sahara (No mobile network in Western Sahara)
  ye: "^(\\+967)[7][0-9]{7,8}$", // Yemen (mandatory +967, 8-9 digits)
  zm: "^(\\+260)[95][0-9]{7,8}$", // Zambia (mandatory +260, 8-9 digits)
  zw: "^(\\+263)[7][0-9]{8,9}$", // Zimbabwe (mandatory +263, 9 digits)
};





export const countriesPhoneList: CountryInfo[] = [
  { shortcode: "af", name: "Afghanistan", dialcode: "+93" },
  { shortcode: "ax", name: "Aland Islands", dialcode: "+358" },
  { shortcode: "al", name: "Albania", dialcode: "+355" },
  { shortcode: "dz", name: "Algeria", dialcode: "+213" },
  { shortcode: "as", name: "American Samoa", dialcode: "+1-684" },
  { shortcode: "ad", name: "Andorra", dialcode: "+376" },
  { shortcode: "ao", name: "Angola", dialcode: "+244" },
  { shortcode: "ai", name: "Anguilla", dialcode: "+1-264" },
  { shortcode: "aq", name: "Antarctica", dialcode: "+672" },
  { shortcode: "ag", name: "Antigua and Barbuda", dialcode: "+1-268" },
  { shortcode: "ar", name: "Argentina", dialcode: "+54" },
  { shortcode: "am", name: "Armenia", dialcode: "+374" },
  { shortcode: "aw", name: "Aruba", dialcode: "+297" },
  { shortcode: "au", name: "Australia", dialcode: "+61" },
  { shortcode: "at", name: "Austria", dialcode: "+43" },
  { shortcode: "az", name: "Azerbaijan", dialcode: "+994" },
  { shortcode: "bs", name: "Bahamas", dialcode: "+1-242" },
  { shortcode: "bh", name: "Bahrain", dialcode: "+973" },
  { shortcode: "bd", name: "Bangladesh", dialcode: "+880" },
  { shortcode: "bb", name: "Barbados", dialcode: "+1-246" },
  { shortcode: "by", name: "Belarus", dialcode: "+375" },
  { shortcode: "be", name: "Belgium", dialcode: "+32" },
  { shortcode: "bz", name: "Belize", dialcode: "+501" },
  { shortcode: "bj", name: "Benin", dialcode: "+229" },
  { shortcode: "bm", name: "Bermuda", dialcode: "+1-441" },
  { shortcode: "bt", name: "Bhutan", dialcode: "+975" },
  {
    shortcode: "bo",
    name: "Bolivia (Plurinational State of)",
    dialcode: "+591",
  },
  {
    shortcode: "bq",
    name: "Bonaire Sint Eustatius and Saba",
    dialcode: "+599",
  },
  { shortcode: "ba", name: "Bosnia and Herzegovina", dialcode: "+387" },
  { shortcode: "bw", name: "Botswana", dialcode: "+267" },
  { shortcode: "bv", name: "Bouvet Island", dialcode: "+55" },
  { shortcode: "br", name: "Brazil", dialcode: "+55" },
  { shortcode: "io", name: "British Indian Ocean Territory", dialcode: "+246" },
  { shortcode: "bn", name: "Brunei Darussalam", dialcode: "+673" },
  { shortcode: "bg", name: "Bulgaria", dialcode: "+359" },
  { shortcode: "bf", name: "Burkina Faso", dialcode: "+226" },
  { shortcode: "bi", name: "Burundi", dialcode: "+257" },
  { shortcode: "cv", name: "Cabo Verde", dialcode: "+238" },
  { shortcode: "kh", name: "Cambodia", dialcode: "+855" },
  { shortcode: "cm", name: "Cameroon", dialcode: "+237" },
  { shortcode: "ca", name: "Canada", dialcode: "+1" },
  { shortcode: "ky", name: "Cayman Islands", dialcode: "+1-345" },
  { shortcode: "cf", name: "Central African Republic", dialcode: "+236" },
  { shortcode: "td", name: "Chad", dialcode: "+235" },
  { shortcode: "cl", name: "Chile", dialcode: "+56" },
  { shortcode: "cn", name: "China", dialcode: "+86" },
  { shortcode: "cx", name: "Christmas Island", dialcode: "+61" },
  { shortcode: "cc", name: "Cocos Keeling Islands", dialcode: "+61" },
  { shortcode: "co", name: "Colombia", dialcode: "+57" },
  { shortcode: "km", name: "Comoros", dialcode: "+269" },
  { shortcode: "cg", name: "Congo", dialcode: "+242" },
  {
    shortcode: "cd",
    name: "Congo Democratic Republic of the",
    dialcode: "+243",
  },
  { shortcode: "ck", name: "Cook Islands", dialcode: "+682" },
  { shortcode: "cr", name: "Costa Rica", dialcode: "+506" },
  { shortcode: "ci", name: "Cote dIvoire", dialcode: "+225" },
  { shortcode: "hr", name: "Croatia", dialcode: "+385" },
  { shortcode: "cu", name: "Cuba", dialcode: "+53" },
  { shortcode: "cw", name: "Curacao", dialcode: "+599" },
  { shortcode: "cy", name: "Cyprus", dialcode: "+357" },
  { shortcode: "cz", name: "Czech Republic", dialcode: "+420" },
  { shortcode: "dk", name: "Denmark", dialcode: "+45" },
  { shortcode: "dj", name: "Djibouti", dialcode: "+253" },
  { shortcode: "dm", name: "Dominica", dialcode: "+1-767" },
  { shortcode: "do", name: "Dominican Republic", dialcode: "+1-809" },
  { shortcode: "ec", name: "Ecuador", dialcode: "+593" },
  { shortcode: "eg", name: "Egypt", dialcode: "+20" },
  { shortcode: "sv", name: "El Salvador", dialcode: "+503" },
  { shortcode: "gq", name: "Equatorial Guinea", dialcode: "+240" },
  { shortcode: "er", name: "Eritrea", dialcode: "+291" },
  { shortcode: "ee", name: "Estonia", dialcode: "+372" },
  { shortcode: "et", name: "Ethiopia", dialcode: "+251" },
  { shortcode: "fk", name: "Falkland Islands Malvinas", dialcode: "+500" },
  { shortcode: "fo", name: "Faroe Islands", dialcode: "+298" },
  { shortcode: "fj", name: "Fiji", dialcode: "+679" },
  { shortcode: "fi", name: "Finland", dialcode: "+358" },
  { shortcode: "fr", name: "France", dialcode: "+33" },
  { shortcode: "gf", name: "French Guiana", dialcode: "+594" },
  { shortcode: "pf", name: "French Polynesia", dialcode: "+689" },
  { shortcode: "tf", name: "French Southern Territories", dialcode: "+262" },
  { shortcode: "ga", name: "Gabon", dialcode: "+241" },
  { shortcode: "gm", name: "Gambia", dialcode: "+220" },
  { shortcode: "ge", name: "Georgia", dialcode: "+995" },
  { shortcode: "de", name: "Germany", dialcode: "+49" },
  { shortcode: "gh", name: "Ghana", dialcode: "+233" },
  { shortcode: "gi", name: "Gibraltar", dialcode: "+350" },
  { shortcode: "gr", name: "Greece", dialcode: "+30" },
  { shortcode: "gl", name: "Greenland", dialcode: "+299" },
  { shortcode: "gd", name: "Grenada", dialcode: "+1-473" },
  { shortcode: "gp", name: "Guadeloupe", dialcode: "+590" },
  { shortcode: "gu", name: "Guam", dialcode: "+1-671" },
  { shortcode: "gt", name: "Guatemala", dialcode: "+502" },
  { shortcode: "gg", name: "Guernsey", dialcode: "+44-1481" },
  { shortcode: "gn", name: "Guinea", dialcode: "+224" },
  { shortcode: "gw", name: "Guinea-Bissau", dialcode: "+245" },
  { shortcode: "gy", name: "Guyana", dialcode: "+592" },
  { shortcode: "ht", name: "Haiti", dialcode: "+509" },
  {
    shortcode: "hm",
    name: "Heard Island and McDonald Islands",
    dialcode: "+672",
  },
  { shortcode: "va", name: "Holy See", dialcode: "+379" },
  { shortcode: "hn", name: "Honduras", dialcode: "+504" },
  { shortcode: "hk", name: "Hong Kong", dialcode: "+852" },
  { shortcode: "hu", name: "Hungary", dialcode: "+36" },
  { shortcode: "is", name: "Iceland", dialcode: "+354" },
  { shortcode: "in", name: "India", dialcode: "+91" },
  { shortcode: "id", name: "Indonesia", dialcode: "+62" },
  { shortcode: "ir", name: "Iran Islamic Republic of", dialcode: "+98" },
  { shortcode: "iq", name: "Iraq", dialcode: "+964" },
  { shortcode: "ie", name: "Ireland", dialcode: "+353" },
  { shortcode: "im", name: "Isle of Man", dialcode: "+44-1624" },
  { shortcode: "il", name: "Israel", dialcode: "+972" },
  { shortcode: "it", name: "Italy", dialcode: "+39" },
  { shortcode: "jm", name: "Jamaica", dialcode: "+1-876" },
  { shortcode: "jp", name: "Japan", dialcode: "+81" },
  { shortcode: "je", name: "Jersey", dialcode: "+44-1534" },
  { shortcode: "jo", name: "Jordan", dialcode: "+962" },
  { shortcode: "kz", name: "Kazakhstan", dialcode: "+7" },
  { shortcode: "ke", name: "Kenya", dialcode: "+254" },
  { shortcode: "ki", name: "Kiribati", dialcode: "+686" },
  {
    shortcode: "kp",
    name: "Korea Democratic Peoples Republic of",
    dialcode: "+850",
  },
  { shortcode: "kr", name: "Korea Republic of", dialcode: "+82" },
  { shortcode: "kw", name: "Kuwait", dialcode: "+965" },
  { shortcode: "kg", name: "Kyrgyzstan", dialcode: "+996" },
  {
    shortcode: "la",
    name: "Lao Peoples Democratic Republic",
    dialcode: "+856",
  },
  { shortcode: "lv", name: "Latvia", dialcode: "+371" },
  { shortcode: "lb", name: "Lebanon", dialcode: "+961" },
  { shortcode: "ls", name: "Lesotho", dialcode: "+266" },
  { shortcode: "lr", name: "Liberia", dialcode: "+231" },
  { shortcode: "ly", name: "Libya", dialcode: "+218" },
  { shortcode: "li", name: "Liechtenstein", dialcode: "+423" },
  { shortcode: "lt", name: "Lithuania", dialcode: "+370" },
  { shortcode: "lu", name: "Luxembourg", dialcode: "+352" },
  { shortcode: "mo", name: "Macao", dialcode: "+853" },
  {
    shortcode: "mk",
    name: "Macedonia the former Yugoslav Republic of",
    dialcode: "+389",
  },
  { shortcode: "mg", name: "Madagascar", dialcode: "+261" },
  { shortcode: "mw", name: "Malawi", dialcode: "+265" },
  { shortcode: "my", name: "Malaysia", dialcode: "+60" },
  { shortcode: "mv", name: "Maldives", dialcode: "+960" },
  { shortcode: "ml", name: "Mali", dialcode: "+223" },
  { shortcode: "mt", name: "Malta", dialcode: "+356" },
  { shortcode: "mh", name: "Marshall Islands", dialcode: "+692" },
  { shortcode: "mq", name: "Martinique", dialcode: "+596" },
  { shortcode: "mr", name: "Mauritania", dialcode: "+222" },
  { shortcode: "mu", name: "Mauritius", dialcode: "+230" },
  { shortcode: "yt", name: "Mayotte", dialcode: "+262" },
  { shortcode: "mx", name: "Mexico", dialcode: "+52" },
  { shortcode: "fm", name: "Micronesia Federated States of", dialcode: "+691" },
  { shortcode: "md", name: "Moldova Republic of", dialcode: "+373" },
  { shortcode: "mc", name: "Monaco", dialcode: "+377" },
  { shortcode: "mn", name: "Mongolia", dialcode: "+976" },
  { shortcode: "me", name: "Montenegro", dialcode: "+382" },
  { shortcode: "ms", name: "Montserrat", dialcode: "+1-664" },
  { shortcode: "ma", name: "Morocco", dialcode: "+212" },
  { shortcode: "mz", name: "Mozambique", dialcode: "+258" },
  { shortcode: "mm", name: "Myanmar", dialcode: "+95" },
  { shortcode: "na", name: "Namibia", dialcode: "+264" },
  { shortcode: "nr", name: "Nauru", dialcode: "+674" },
  { shortcode: "np", name: "Nepal", dialcode: "+977" },
  { shortcode: "nl", name: "Netherlands", dialcode: "+31" },
  { shortcode: "nc", name: "New Caledonia", dialcode: "+687" },
  { shortcode: "nz", name: "New Zealand", dialcode: "+64" },
  { shortcode: "ni", name: "Nicaragua", dialcode: "+505" },
  { shortcode: "ne", name: "Niger", dialcode: "+227" },
  { shortcode: "ng", name: "Nigeria", dialcode: "+234" },
  { shortcode: "nu", name: "Niue", dialcode: "+683" },
  { shortcode: "nf", name: "Norfolk Island", dialcode: "+672" },
  { shortcode: "mp", name: "Northern Mariana Islands", dialcode: "+1-670" },
  { shortcode: "no", name: "Norway", dialcode: "+47" },
  { shortcode: "om", name: "Oman", dialcode: "+968" },
  { shortcode: "pk", name: "Pakistan", dialcode: "+92" },
  { shortcode: "pw", name: "Palau", dialcode: "+680" },
  { shortcode: "ps", name: "Palestine State of", dialcode: "+970" },
  { shortcode: "pa", name: "Panama", dialcode: "+507" },
  { shortcode: "pg", name: "Papua New Guinea", dialcode: "+675" },
  { shortcode: "py", name: "Paraguay", dialcode: "+595" },
  { shortcode: "pe", name: "Peru", dialcode: "+51" },
  { shortcode: "ph", name: "Philippines", dialcode: "+63" },
  { shortcode: "pn", name: "Pitcairn", dialcode: "+64" },
  { shortcode: "pl", name: "Poland", dialcode: "+48" },
  { shortcode: "pt", name: "Portugal", dialcode: "+351" },
  { shortcode: "pr", name: "Puerto Rico", dialcode: "+1-787" },
  { shortcode: "qa", name: "Qatar", dialcode: "+974" },
  { shortcode: "re", name: "Reunion", dialcode: "+262" },
  { shortcode: "ro", name: "Romania", dialcode: "+40" },
  { shortcode: "ru", name: "Russian Federation", dialcode: "+7" },
  { shortcode: "rw", name: "Rwanda", dialcode: "+250" },
  { shortcode: "bl", name: "Saint Barthelemy", dialcode: "+590" },
  {
    shortcode: "sh",
    name: "Saint Helena Ascension and Tristan da Cunha",
    dialcode: "+290",
  },
  { shortcode: "kn", name: "Saint Kitts and Nevis", dialcode: "+1-869" },
  { shortcode: "lc", name: "Saint Lucia", dialcode: "+1-758" },
  { shortcode: "mf", name: "Saint Martin French part", dialcode: "+590" },
  { shortcode: "pm", name: "Saint Pierre and Miquelon", dialcode: "+508" },
  {
    shortcode: "vc",
    name: "Saint Vincent and the Grenadines",
    dialcode: "+1-784",
  },
  { shortcode: "ws", name: "Samoa", dialcode: "+685" },
  { shortcode: "sm", name: "San Marino", dialcode: "+378" },
  { shortcode: "st", name: "Sao Tome and Principe", dialcode: "+239" },
  { shortcode: "sa", name: "Saudi Arabia", dialcode: "+966" },
  { shortcode: "sn", name: "Senegal", dialcode: "+221" },
  { shortcode: "rs", name: "Serbia", dialcode: "+381" },
  { shortcode: "sc", name: "Seychelles", dialcode: "+248" },
  { shortcode: "sl", name: "Sierra Leone", dialcode: "+232" },
  { shortcode: "sg", name: "Singapore", dialcode: "+65" },
  { shortcode: "sx", name: "Sint Maarten Dutch part", dialcode: "+1-721" },
  { shortcode: "sk", name: "Slovakia", dialcode: "+421" },
  { shortcode: "si", name: "Slovenia", dialcode: "+386" },
  { shortcode: "sb", name: "Solomon Islands", dialcode: "+677" },
  { shortcode: "so", name: "Somalia", dialcode: "+252" },
  { shortcode: "za", name: "South Africa", dialcode: "+27" },
  {
    shortcode: "gs",
    name: "South Georgia and the South Sandwich Islands",
    dialcode: "+500",
  },
  { shortcode: "ss", name: "South Sudan", dialcode: "+211" },
  { shortcode: "es", name: "Spain", dialcode: "+34" },
  { shortcode: "lk", name: "Sri Lanka", dialcode: "+94" },
  { shortcode: "sd", name: "Sudan", dialcode: "+249" },
  { shortcode: "sr", name: "Suriname", dialcode: "+597" },
  { shortcode: "sj", name: "Svalbard and Jan Mayen", dialcode: "+47" },
  { shortcode: "sz", name: "Swaziland", dialcode: "+268" },
  { shortcode: "se", name: "Sweden", dialcode: "+46" },
  { shortcode: "ch", name: "Switzerland", dialcode: "+41" },
  { shortcode: "sy", name: "Syrian Arab Republic", dialcode: "+963" },
  { shortcode: "tw", name: "Taiwan Province of China", dialcode: "+886" },
  { shortcode: "tj", name: "Tajikistan", dialcode: "+992" },
  { shortcode: "tz", name: "Tanzania United Republic of", dialcode: "+255" },
  { shortcode: "th", name: "Thailand", dialcode: "+66" },
  { shortcode: "tl", name: "Timor-Leste", dialcode: "+670" },
  { shortcode: "tg", name: "Togo", dialcode: "+228" },
  { shortcode: "tk", name: "Tokelau", dialcode: "+690" },
  { shortcode: "to", name: "Tonga", dialcode: "+676" },
  { shortcode: "tt", name: "Trinidad and Tobago", dialcode: "+1-868" },
  { shortcode: "tn", name: "Tunisia", dialcode: "+216" },
  { shortcode: "tr", name: "Turkey", dialcode: "+90" },
  { shortcode: "tm", name: "Turkmenistan", dialcode: "+993" },
  { shortcode: "tc", name: "Turks and Caicos Islands", dialcode: "+1-649" },
  { shortcode: "tv", name: "Tuvalu", dialcode: "+688" },
  { shortcode: "ug", name: "Uganda", dialcode: "+256" },
  { shortcode: "ua", name: "Ukraine", dialcode: "+380" },
  { shortcode: "ae", name: "United Arab Emirates", dialcode: "+971" },
  {
    shortcode: "gb",
    name: "United Kingdom of Great Britain and Northern Ireland",
    dialcode: "+44",
  },
  { shortcode: "us", name: "United States of America", dialcode: "+1" },
  {
    shortcode: "um",
    name: "United States Minor Outlying Islands",
    dialcode: "+246",
  },
  { shortcode: "uy", name: "Uruguay", dialcode: "+598" },
  { shortcode: "uz", name: "Uzbekistan", dialcode: "+998" },
  { shortcode: "vu", name: "Vanuatu", dialcode: "+678" },
  {
    shortcode: "ve",
    name: "Venezuela Bolivarian Republic of",
    dialcode: "+58",
  },
  { shortcode: "vn", name: "Viet Nam", dialcode: "+84" },
  { shortcode: "vg", name: "Virgin Islands British", dialcode: "+1-284" },
  { shortcode: "vi", name: "Virgin Islands U.S.", dialcode: "+1-340" },
  { shortcode: "wf", name: "Wallis and Futuna", dialcode: "+681" },
  { shortcode: "eh", name: "Western Sahara", dialcode: "+212" },
  { shortcode: "ye", name: "Yemen", dialcode: "+967" },
  { shortcode: "zm", name: "Zambia", dialcode: "+260" },
  { shortcode: "zw", name: "Zimbabwe", dialcode: "+263" },
];

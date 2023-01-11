export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  level: number;
  roles: string;
  token: string;
}

export class OS_Sredstva {
  OS_ID: number;
  InventarenBroj: string;
  SeriskiBroj: string;
  Naziv: string;
  Opis: string;
  Kolicina: number;
  Datum: string;
  Godina: number;
  Mesec: number;
  OdgovornoLice: string;
  PodGrupa_ID: number;
  OrgEdinica_ID: number;
  Lokacija_ID: number;
  Sprat_ID: number;
  Soba_ID: number;
  OdgovornoLice_ID: number;
  Dobavuvac_ID: number;
  FakturaBroj: string;
  FakturaOpis: string;
  Cena: number;
  DodatniTrosoci: number;
  NalogBroj: string;
  Status: number;
}

export class OS_OrgEdinici {
  OrgEdinica_ID: number;
  Naziv: string;
  Opis: string;
  Status: number;
}

export class OS_Lokacii {
  Lokacija_ID: number;
  Naziv: string;
  Opis: string;
  Status: number;
}

export class OS_Spratovi {
  Sprat_ID: number;
  Naziv: string;
  Opis: string;
  Link_ID: number;
  Status: number;
}

export class OS_Sobi {
  Soba_ID: number;
  Naziv: string;
  Opis: string;
  Link_ID: number;
  Status: number;
}

export class OS_OdgovorniLica {
  OdgovornoLice_ID: number;
  Naziv: string;
  Opis: string;
  Link_ID: number;
  Status: number;
}

export class V_Popisani {
  UredBroj: number;
  OS_ID: number;
  InventarenBroj: string;
  SeriskiBroj: string;
  Naziv: string;
  Opis: string;
  PopisOrgEdinica_ID: number;
  PopisOrgEdinicaNaziv: string;
  SredstvoOrgEdinica_ID: number;
  SredstvoOrgEdinicaNaziv: string;
  PopisLokacija_ID: number;
  PopisLokacijaNaziv: string;
  SredstvoLokacija_ID: number;
  SredstvoLokacijaNaziv: string;
  PopisSprat_ID: number;
  PopisSpratNaziv: string;
  SredstvoSprat_ID: number;
  SredstvoSpratNaziv: string;
  PopisSoba_ID: number;
  PopisSobaNaziv: string;
  SredstvoSoba_ID: number;
  SredstvoSobaNaziv: string;
  PopisOdgovornoLice_ID: number;
  PopisOdgovornoLice: string;
  SredstvoOdgovornoLice_ID: number;
  SredstvoOdgovornoLice: string;
  TekovnaVrednost: number;
  Zabeleska: string;
  ImaPromena: string;
  Promeni: string;
  DatPromena: string;
  Korisnik: string;
  KorisnikNaziv: string;
}

export class V_Nepopisani {
  OS_ID: number;
  InventarenBroj: string;
  SeriskiBroj: string;
  Naziv: string;
  Opis: string;
  Godina: number;
  Mesec: number;
  OdgovornoLice_ID: number;
  OdgovornoLice: string;
  OrgEdinica_ID: number;
  OrgEdinicaNaziv: string;
  Lokacija_ID: number;
  LokacijaNaziv: string;
  Sprat_ID: number;
  SpratNaziv: string;
  Soba_ID: number;
  SobaNaziv: string;
  FakturaBroj: string;
  FakturaOpis: string;
  Cena: number;
}

export class V_Popis {
  PopisBroj: number;
  UredBroj: number;
  OS_ID: number;
  OrgEdinica_ID: number;
  Lokacija_ID: number;
  Sprat_ID: number;
  Soba_ID: number;
  OdgovornoLice_ID: number;
  OdgovornoLice: string;
  Kolicina: number;
  Sostojba_ID: number;
  Zabeleska: string;
  DatPromena: string;
  Korisnik: string;
}

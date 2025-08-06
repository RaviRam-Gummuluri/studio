export type Bond = {
  id: number;
  isin: string;
  cusip: string;
  issuer: string;
  maturityDate: Date;
  counterparty: string;
  book: string;
  status: 'Open' | 'Cancelled' | 'Resolved';
  assignedTo: {
    name: string;
    avatar: string;
  } | null;
};

const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const mockBonds: Bond[] = [
  {
    id: 1,
    isin: 'US912828U624',
    cusip: '912828U62',
    issuer: 'United States Treasury',
    maturityDate: addDays(today, 3),
    counterparty: 'Goldman Sachs',
    book: 'GOV-US',
    status: 'Open',
    assignedTo: { name: 'Alice', avatar: 'https://placehold.co/32x32' },
  },
  {
    id: 2,
    isin: 'DE0001102341',
    cusip: 'D110234',
    issuer: 'Bundesrepublik Deutschland',
    maturityDate: addDays(today, 5),
    counterparty: 'JP Morgan',
    book: 'GOV-DE',
    status: 'Open',
    assignedTo: null,
  },
  {
    id: 3,
    isin: 'GB00B15L3W40',
    cusip: 'B15L3W4',
    issuer: 'United Kingdom Gilt',
    maturityDate: addDays(today, -2),
    counterparty: 'Barclays',
    book: 'CORP-UK',
    status: 'Resolved',
    assignedTo: { name: 'Bob', avatar: 'https://placehold.co/32x32' },
  },
  {
    id: 4,
    isin: 'US0378331005',
    cusip: '037833100',
    issuer: 'Apple Inc.',
    maturityDate: addDays(today, -4),
    counterparty: 'Morgan Stanley',
    book: 'TECH-US',
    status: 'Resolved',
    assignedTo: { name: 'Alice', avatar: 'https://placehold.co/32x32' },
  },
  {
    id: 5,
    isin: 'XS1901768788',
    cusip: '190176878',
    issuer: 'Tesco PLC',
    maturityDate: addDays(today, 10),
    counterparty: 'HSBC',
    book: 'RETAIL-EU',
    status: 'Open',
    assignedTo: { name: 'Charlie', avatar: 'https://placehold.co/32x32' },
  },
  {
    id: 6,
    isin: 'US124660BC23',
    cusip: '124660BC2',
    issuer: 'Coca-Cola Co',
    maturityDate: addDays(today, 25),
    counterparty: 'Citigroup',
    book: 'CONSUM-US',
    status: 'Open',
    assignedTo: null,
  },
  {
    id: 7,
    isin: 'JP3788600003',
    cusip: '378860000',
    issuer: 'SoftBank Group Corp',
    maturityDate: addDays(today, 1),
    counterparty: 'Nomura',
    book: 'TECH-JP',
    status: 'Cancelled',
    assignedTo: { name: 'Diana', avatar: 'https://placehold.co/32x32' },
  },
  {
    id: 8,
    isin: 'FR0013338243',
    cusip: 'F13338243',
    issuer: 'LVMH Moet Hennessy',
    maturityDate: addDays(today, -1),
    counterparty: 'BNP Paribas',
    book: 'LUX-EU',
    status: 'Resolved',
    assignedTo: { name: 'Bob', avatar: 'https://placehold.co/32x32' },
  },
];

export const mockUsers = [
    { id: 'usr_1', name: 'Alice Smith', email: 'alice@example.com', role: 'Trader', books: ['GOV-US', 'TECH-US'] },
    { id: 'usr_2', name: 'Bob Johnson', email: 'bob@example.com', role: 'Trader', books: ['CORP-UK', 'LUX-EU'] },
    { id: 'usr_3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', books: ['ALL'] },
    { id: 'usr_4', name: 'Diana Prince', email: 'diana@example.com', role: 'Analyst', books: ['TECH-JP'] },
];

export const mockBooks = [
    { id: 'book_1', name: 'GOV-US', description: 'US Government Bonds' },
    { id: 'book_2', name: 'GOV-DE', description: 'German Government Bonds' },
    { id: 'book_3', name: 'CORP-UK', description: 'UK Corporate Bonds' },
    { id: 'book_4', name: 'TECH-US', description: 'US Technology Corporate Bonds' },
    { id: 'book_5', name: 'RETAIL-EU', description: 'European Retail Sector Bonds' },
];

export const mockSecurities = [
    { isin: 'US912828U624', cusip: '912828U62', issuer: 'United States Treasury', type: 'Government Bond' },
    { isin: 'DE0001102341', cusip: 'D110234', issuer: 'Bundesrepublik Deutschland', type: 'Government Bond' },
    { isin: 'GB00B15L3W40', cusip: 'B15L3W4', issuer: 'United Kingdom Gilt', type: 'Government Bond' },
    { isin: 'US0378331005', cusip: '037833100', issuer: 'Apple Inc.', type: 'Corporate Bond' },
];

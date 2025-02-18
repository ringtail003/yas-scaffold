declare global {
  type Sheet = {
    getRange: (range: string) => Range;
  };

  type Range = {
    setValues(values: (string | number)[][]): Range;
    getValues(): (string | number)[][];
  };

  type Spreadsheet = {
    getId(): string;
    getName(): string;
    copy(name: string): Spreadsheet;
    getSheets(): Sheet[];
    getSheetByName(name: string): Sheet | null;
  };

  type SpreadsheetApp = {
    create(name: string): Spreadsheet;
    openById(id: string): Spreadsheet;
  };

  type DriveFile = {
    getId(): string;
    getName(): string;
  };

  type FileIterator = {
    hasNext(): boolean;
    next(): DriveFile;
  };

  type Folder = {
    getFiles(): FileIterator;
  };

  type DriveApp = {
    getFolderById(id: string): Folder;
    getFileById(id: string): DriveFile;
  };

  type AdsUtilities = {
    getCurrentAccountId(): number;
  };

  type AccountLinkService = {
    get(selector: {
      mccAccountId: number;
      accountStatuses: (
        | "INPROGRESS"
        | "WAIT_DECIDE"
        | "SUSPENDED"
        | "SERVING"
        | "ENDED"
        | "UNKNOWN"
      )[];
      numberResults: null | number;
      startIndex: null | number;
    }): {
      rval: {
        totalNumEntries?: number;
        values?:
          | null
          | {
              accountLink?: null | {
                accountId?: number;
              };
            }[];
      };
    };
  };

  type PlacementUrlListService = {
    get(selector: {
      accountId: number;
      numberResults: null | number;
      startIndex: null | number;
    }): {
      rval: {
        totalNumEntries?: number;
        values?: null | PlacementUrlListServiceGetResponseValue[];
      };
    };
  };
  type PlacementUrlListServiceGetResponseValue = {
    urlList?: null | {
      accountId: number;
      brandSafetyDenyListFlg?: boolean;
      urlListId?: null | number;
      urlListName?: null | string;
      urls?: null | { placementUrl?: null | string }[];
    };
  };

  type AdGroupService = {
    get(selector: {
      accountId: number;
      numberResults: null | number;
      startIndex: null | number;
    }): {
      rval: {
        totalNumEntries?: number;
        values?: null | AdGroupServiceGetResponseValue[];
      };
    };
  };
  type AdGroupServiceGetResponseValue = {
    adGroup?: null | {
      adGroupId?: number;
      userStatus: "ACTIVE" | "PAUSED" | "UNKNOWN";
    };
  };

  type AdGroupTargetService = {
    get(selector: {
      accountId: number;
      numberResults: null | number;
      startIndex: null | number;
    }): {
      rval: {
        totalNumEntries?: number;
        values?: null | AdGroupTargetServiceGetResponseValue[];
      };
    };
  };
  type AdGroupTargetServiceGetResponseValue = {
    adGroupTargetList?: null | {
      accountId: number;
      adGroupId?: null | number;
      target?: {
        placementTarget?: {
          placementUrlListName?: null | string;
          placementUrlListType?: null | "WHITE_LIST" | "BLACK_LIST" | "UNKNOWN";
        } | null;
      } | null;
    };
  };

  type AccountService = {
    get(selector: {
      accountIds: number[];
      numberResults: null | number;
      startIndex: null | number;
    }): {
      rval: {
        totalNumEntries?: number;
        values?: null | AccountServiceGetResponseValue[];
      };
    };
  };
  type AccountServiceGetResponseValue = {
    account?: null | {
      accountId?: number;
      accountName?: null | string;
      deliveryStatus?: "ACTIVE" | "PAUSED" | "UNKNOWN";
      startDate?: null | string;
      endDate?: null | string;
      isMccAccount?: "TRUE" | "FALSE" | "UNKNOWN";
    };
  };

  type Display = {
    AccountLinkService: AccountLinkService;
    PlacementUrlListService: PlacementUrlListService;
    AdGroupService: AdGroupService;
    AdGroupTargetService: AdGroupTargetService;
    AccountService: AccountService;
  };

  type Logger = {
    log(msg: unknown): void;
  };

  var SpreadsheetApp: SpreadsheetApp;
  var Logger: Logger;
  var DriveApp: DriveApp;
  var AdsUtilities: AdsUtilities;
  var Display: Display;
}

export {};

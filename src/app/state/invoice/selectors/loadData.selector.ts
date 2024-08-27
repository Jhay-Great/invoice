import { createSelector } from "@ngrx/store";
import { LoadingState } from "../reducers/loadData.reducer";

const loadDataSelect = (state:LoadingState) => state;
const dataSelect = (state:any) => state.load;

export const selectLoadInvoice = createSelector(
    loadDataSelect,
    state => state,
);
export const loadInvoice = createSelector(
    dataSelect,
    state => state,
);

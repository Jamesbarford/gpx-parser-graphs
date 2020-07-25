import { union, castArray } from "lodash";
import { parseISO } from "date-fns";

import { SpeedAndDistance } from "../../models/SpeedAndDistance";
import { DistanceFormat } from "../../models/DistanceFormat";
import { RequestState, Success } from "../../../lib/persistance";
import { UploadGPXFileSuccess, UploadGPXActionTypes } from "../../../App/components/GpxUploader/actions";
import { shallowUpdate } from "../../../lib/util";

export interface RunningDataState {
    distanceFormat: DistanceFormat;
    byId: Record<string, RunningBreakDown>;
    ids: Array<string>;
}

interface RunningBreakDown {
    id: string;
    requestState: RequestState;
    runName?: string;
    date?: Date;
    breakDownWholeRun?: Array<SpeedAndDistance>;
    breakDownByDistanceInterval?: Array<SpeedAndDistance>;
}


function initRunningDataState(): RunningDataState {
    return {
        distanceFormat: DistanceFormat.KILOMETERS,
        byId: {},
        ids: []
    };
}

type RunningDataActions = UploadGPXFileSuccess;

export function runningDataReducer(state: RunningDataState = initRunningDataState(), action: RunningDataActions): RunningDataState {
    switch (action.type) {
        case UploadGPXActionTypes.UploadGPXFileSuccess:
            return shallowUpdate(
                state,
                {
                    byId: updateDataById(state, action.isoDate, {
                        breakDownWholeRun: action.speedAndDistanceList,
                        requestState: new Success()
                    }),
                    ids: updateIds(state.ids, action.isoDate)
                }
            );


        default:
            return state;
    }
}


function updateDataById(state: RunningDataState, dateString: string, patch: Partial<RunningBreakDown>): Record<string, RunningBreakDown> {
    const currentData = state.byId[dateString] || {};

    const runningData = shallowUpdate(currentData, { id: dateString, date: parseISO(dateString), ...patch });

    return shallowUpdate(state.byId, { [dateString]: runningData });
}


function updateIds(stateIds: Array<string>, id: string | Array<string>): Array<string> {
    return union(stateIds, castArray(id)).sort((a, b) => {
        return parseISO(a).getTime() - parseISO(b).getTime();
    });
}

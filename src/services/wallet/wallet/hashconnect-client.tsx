import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  getConnectedAccountIds,
  hc,
  hcInitPromise,
} from "./hashconnect.ts";
import { actions } from "../../../store/index.ts";

export const HashConnectClient = () => {
  const dispatch = useDispatch();
  const syncWithHashConnect = useCallback(() => {
    const connectedAccountIds = getConnectedAccountIds();
    console.log(connectedAccountIds);
    if (connectedAccountIds.length > 0) {
      dispatch(
        actions.hashconnect.setAccountIds(
          connectedAccountIds.map((o) => o.toString())
        )
      );
      dispatch(actions.hashconnect.setIsConnected(true));
      dispatch(actions.hashconnect.setPairingString(hc.pairingString ?? ""));
    } else {
      dispatch(actions.hashconnect.setAccountIds([]));
      dispatch(actions.hashconnect.setIsConnected(false));
      dispatch(actions.hashconnect.setPairingString(hc.pairingString ?? ""));
    }
  }, [dispatch]);

  syncWithHashConnect();
  hcInitPromise.then(() => {
    syncWithHashConnect();
  });
  hc.pairingEvent.on(() => {
    syncWithHashConnect();
  });
  hc.disconnectionEvent.on(() => {
    syncWithHashConnect();
  });
  hc.connectionStatusChangeEvent.on(() => {
    syncWithHashConnect();
  });
  return null;
};
import { Redirect } from 'expo-router';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export type TUpdateStatus = 'checking' | 'downloading' | 'ready' | 'error';

export default function Index() {
  const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<TUpdateStatus | null>(null);

  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    async function handleUpdates() {
      if (__DEV__ || Platform.OS === 'web') {
        setReadyToRedirect(true);
        return;
      }

      if (isUpdateAvailable) {
        try {
          setUpdateStatus('downloading');
          await Updates.fetchUpdateAsync();
          setUpdateStatus('ready');
          await Updates.reloadAsync();
        } catch (error) {
          alert('더 많은 혜택을 위해\n스토어에서 업데이트를 진행해주세요.');
          setUpdateStatus('error');
          setReadyToRedirect(true);
        }
      } else {
        setUpdateStatus(null);
        setReadyToRedirect(true);
      }
    }

    handleUpdates();
  }, [isUpdateAvailable]);

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  if (updateStatus) {
    //return <LoadingUpdateFeedback status={updateStatus} />;
    return null;
  }

  if (readyToRedirect) {
    return <Redirect href="/home" />;
  }

  //return <LoadingIndicator />;
  return null;
}

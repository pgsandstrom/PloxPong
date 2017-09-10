let serverUrl;

export default () => {
  if (serverUrl == null) {
    // const port = location.port ? `:${location.port}` : '';
    const port = ':8088';
    serverUrl = `${window.location.protocol}//${window.location
      .hostname}${port}`;
  }
  return serverUrl;
};

# Steam Deploy

Github Action to deploy a game to Steam

## Setup

#### Prerequisites

This action assumes you are registered as a [partner](https://partner.steamgames.com/) with Steam.

#### 1. Create a Steam Build Account

Create a specialised builder account that only has access to `Edit App Metadata` and `Publish App Changes To Steam`,
and permissions to edit your specific app.

https://partner.steamgames.com/doc/sdk/uploading#Build_Account

#### 2. Export your build

In order to upload a build, this action is assuming that you have created that build in a previous `step` or `job`.

For an example of how to do this in Unity, see [Unity Actions](https://github.com/game-ci/unity-actions).

The exported artifact will be used in the next step.

#### 3. Configure for deployment

In order to configure this action, configure a step that looks like the following:

_(The parameters are explained below)_

```yaml
jobs:
  deployToSteam:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Steam
        uses: ModLabsCC/steam-deploy@v3
        with:
          username: ${{ secrets.STEAM_USERNAME }}
          password: ${{ secrets.STEAM_PASSWORD }}
          shared_secret: ${{ secrets.STEAM_SHARED_SECRET }}
          appId: 1234560
          buildDescription: v1.2.3
          rootPath: build
          depot1Path: StandaloneWindows64
          depot2Path: StandaloneLinux64
          releaseBranch: prerelease
```

## Configuration

#### username

The username of the Steam Build Account that you created in setup step 1.

#### password

The password for your Steam Build Account.

#### shared_secret

A TOTP "shared secret" from the Steam Guard Mobile Authenticator for this account.  
This allows the action to generate time-based login codes for two-factor authentication.

#### appId

The identifier of your app on steam. You can find it on your [dashboard](https://partner.steamgames.com/dashboard).

#### buildDescription

The identifier for this specific build, which helps you identify it in steam. 

It is recommended to use the semantic version of the build for this.

#### rootPath

The root path to your builds. This is the base of which depots will search your files.

#### depot[X]Path

Where X is any number between 1 and 9 (inclusive both).

The relative path following your root path for the files to be included in this depot.

If your appId is 125000 then the depots 125001 ... 125009 will be assumed.

#### depot[X]InstallScriptPath

Where X is any number between 1 and 9 (inclusive both).

Optional. Path to a custom install script for a depot, relative to rootPath.
When omitted, a default install script will be generated.

#### firstDepotIdOverride

You can use this to override the ID of the first depot in case the IDs do not start as described in depot[X]Path (e.g. for DLCs).

If your firstDepotId is 125000 then, regardless of the used appId, the depots 125000 ... 125008 will be assumed.

_(feel free to contribute if you have a more complex use case!)_

#### releaseBranch

The branch within steam that this build will be automatically put live on.

Note that the `default` branch [has been observed to not work](https://github.com/game-ci/steam-deploy/issues/19) as a release branch, presumably because it is potentially dangerous.

## Other Notes

#### Excluded Files / Folders

Certain file or folder patterns are excluded from the upload to Steam as they're unsafe to ship to players:

- `*.pdb` - symbols files
- Folders that Unity includes in builds with debugging or other information that isn't intended to be sent to players:
    - `*_BurstDebugInformation_DoNotShip`
    - `*_BackUpThisFolder_ButDontShipItWithYourGame`

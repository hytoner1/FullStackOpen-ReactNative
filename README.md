# FullStackOpen-ReactNative
## Roni Hytonen, roni.hytonen(at)aalto.fi

React native frontend for Rate Repository app, backend taken from https://github.com/fullstack-hy2020/rate-repository-api
Tested primarily with the web version of expro, and occassionally with Android Studio (android studio had refresh problems whenever code was updated while studio was running).

The alert for deleting a comment in `MyReview.jsx` does not work in the web view, which is a known issue.
Tested in the web view that the comment deletion works by bypassing alert.

The infinite scrolling of repositories in `RepositoryList.jsx` is unreliable: for some reason the `onEndReach` method is not triggered in web version. Solved the problem by adding a button for triggering the fethcing of the next batch of repositories manually. 

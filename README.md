This is a small program made with gulp to automate the process of creating a zip file containing all the mod content, and move it over to the mods folder. If possible it will also launch the game.

# Install process
To be able to run the the program, you'll require to have node.js installed. You can install node.js from [here](https://nodejs.org/en/download/).

To use the mod, start by including these files inside a folder in the same directory as the info.json file.
Once that's done you can run the [install_local.bat](https://github.com/LovelySanta/FactorioModBuilder/blob/master/install_local.bat) file. This will install all the needed packages, including gulp itself in the folder. This file you'll only have to run once.

When that is done, you can run the [build_mod.bat](https://github.com/LovelySanta/FactorioModBuilder/blob/master/build_mod.bat) file which will execute the mod building script.
This file you'll run each time you want to build the mod zip file.

Have fun modding!

# Automate inclusion in github
It is easy to have this part automated in your github mod. It is about automation, right?
This is done by adding this repository to your git repository as a submodule.

### Adding the submodule for the first time
To add the module you first need the remote link of the submodule. You can find the remote url on each git repo:
![remote url location](https://help.github.com/assets/images/help/repository/remotes-url.png)
For this project it is
```
https://github.com/LovelySanta/FactorioModBuilder.git
```

The next step is to add it to a location in your project. Remember, it has to be in a folder in the same directory as the info.json file.
In this example it will add the submodule to a folder named build.
```
git submodule add https://github.com/LovelySanta/FactorioModBuilder.git build
```

The next step is to initialize and clone the submodule
```
git submodule init
git submodule update
```

As last step, we add it to the repository
```
git add build
git commit -m "Added mod build script."
git push origin master
```

When you never used modules before, it won't download the module content automaticly when pulling from your repo. Becose you want to use the script you'll have to change that setting by running the next command, or pull them manualy.
```
git config --global submodule.recurse true
```

### Update the submodule to a newer version
First we change to the submodule directory, it should say you're on a different branch then.
```
cd build
```

The next step is to pull the changes from this repository
```
git checkout master
git pull origin master
```

As final step, you move back to your branch and commit the changes
```
cd ..
git add build
git commit -m "Updated mod build script."
git push origin master
```

首先将以下几行加入 app\build.gradle 文件头
	apply from: "$rootDir/node_modules/react-native/react.gradle"

	def enableSeparateBuildPerCPUArchitecture = true

	def enableProguardInReleaseBuilds = false

    splits {
        abi {
            reset()
            enable enableSeparateBuildPerCPUArchitecture
            universalApk false  // If true, also generate a universal APK
            include "armeabi-v7a", "x86"
        }
    }

    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            // For each separate APK per architecture, set a unique version code as described here:
            // http://tools.android.com/tech-docs/new-build-system/user-guide/apk-splits
            def versionCodes = ["armeabi-v7a":1, "x86":2]
            def abi = output.getFilter(OutputFile.ABI)
            if (abi != null) {  // null for the universal-debug, universal-release variants
                output.versionCodeOverride =
                        versionCodes.get(abi) * 1048576 + defaultConfig.versionCode
            }
        }
    }

同时修改react.gradle
	将
	def reactRoot = elvisFile(config.root) ?: file("../../")
	修改为
	def reactRoot = elvisFile(config.root) ?: file("../")
	// 如果不修改，则 reactRoot指向着Android项目的更上一层目录

	将
	def inputExcludes = config.inputExcludes ?: ["android/**", "ios/**"]
	修改为
	def inputExcludes = config.inputExcludes ?: ["android/**", "ios/**", ".gradle/**","app/**","build/**","captures/**","gradle/**"]
	// 去掉一些需要排除掉的文件夹，否则这些文件也会被视为JsAndAssets打包成bundle

以上修改 react.gradle 的配置可以放到 app\build.gradle 文件中定义，使用 project.ext.react 块，这也是后面才明白的。
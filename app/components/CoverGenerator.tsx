"use client";

import { useCoverGenerator } from "../hooks/useCoverGenerator";
import {
    ControlHeader,
    TabNavigation,
    GenerativeTab,
    ContentTab,
    Preview,
    Toast,
} from "./cover-generator";

export default function CoverGenerator() {
    const {
        canvasRef,
        captureRef,
        activeTab,
        params,
        artistName,
        albumTitle,
        imageOpacity,
        noiseOpacity,
        globalBlur,
        blendMode,
        fontClass,
        userImage,
        toastMessage,
        setActiveTab,
        setParams,
        setArtistName,
        setAlbumTitle,
        setImageOpacity,
        setNoiseOpacity,
        setGlobalBlur,
        setBlendMode,
        setFontClass,
        randomize,
        handleImageUpload,
        downloadCover,
        regenerateLines,
    } = useCoverGenerator();

    return (
        <section
            id="cover-generator"
            className="relative w-screen min-h-screen bg-[var(--bg-deep)] overflow-hidden z-20"
        >
            <div className="absolute inset-0 partynextdoor-gradient opacity-50" />

            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-5"
                style={{
                    backgroundImage: "url('/bg-disco2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />

            <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
                <h2 className="font-syne text-2xl md:text-3xl text-white tracking-tighter mb-12 md:mb-16 text-center">
                    COVER GENERATOR
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <aside className="w-full lg:w-[380px] shrink-0">
                        <ControlHeader
                            onRandomize={randomize}
                            onExport={downloadCover}
                        />

                        <TabNavigation
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        {activeTab === "gen" && (
                            <GenerativeTab
                                params={params}
                                imageOpacity={imageOpacity}
                                onParamsChange={(newParams) =>
                                    setParams((p) => ({ ...p, ...newParams }))
                                }
                                onImageOpacityChange={setImageOpacity}
                                onRegenerateLines={regenerateLines}
                            />
                        )}

                        {activeTab === "content" && (
                            <ContentTab
                                artistName={artistName}
                                albumTitle={albumTitle}
                                blendMode={blendMode}
                                fontClass={fontClass}
                                noiseOpacity={noiseOpacity}
                                globalBlur={globalBlur}
                                onArtistNameChange={setArtistName}
                                onAlbumTitleChange={setAlbumTitle}
                                onBlendModeChange={setBlendMode}
                                onFontClassChange={setFontClass}
                                onNoiseOpacityChange={setNoiseOpacity}
                                onGlobalBlurChange={setGlobalBlur}
                                onImageUpload={handleImageUpload}
                            />
                        )}
                    </aside>

                    <Preview
                        captureRef={captureRef}
                        canvasRef={canvasRef}
                        globalBlur={globalBlur}
                        userImage={userImage}
                        imageOpacity={imageOpacity}
                        blendMode={blendMode}
                        noiseOpacity={noiseOpacity}
                        fontClass={fontClass}
                        artistName={artistName}
                        albumTitle={albumTitle}
                    />
                </div>
            </div>

            <Toast message={toastMessage} />
        </section>
    );
}

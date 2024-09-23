import {MD3DarkTheme, MD3LightTheme} from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

export default class Theme {
    static light = {
        "colors": {
            "primary": "rgb(66, 165, 245)", // Azul Claro
            "onPrimary": "rgb(255, 255, 255)", // Texto sobre o primário (branco)
            "primaryContainer": "rgb(227, 242, 253)", // Fundo mais claro para destaque do primário
            "onPrimaryContainer": "rgb(13, 71, 161)", // Texto sobre o fundo primário claro

            "secondary": "rgb(255, 112, 67)", // Laranja Vibrante
            "onSecondary": "rgb(255, 255, 255)", // Texto sobre o secundário
            "secondaryContainer": "rgb(255, 224, 178)", // Fundo mais claro para o secundário
            "onSecondaryContainer": "rgb(191, 54, 12)", // Texto sobre o fundo secundário claro

            "tertiary": "rgb(255, 87, 34)", // Laranja mais escuro como cor terciária
            "onTertiary": "rgb(255, 255, 255)", // Texto sobre o terciário
            "tertiaryContainer": "rgb(255, 204, 188)", // Fundo mais claro para o terciário
            "onTertiaryContainer": "rgb(183, 28, 28)", // Texto sobre o fundo terciário

            "error": "rgb(211, 47, 47)", // Cor para erros (vermelho forte)
            "onError": "rgb(255, 255, 255)", // Texto sobre erros
            "errorContainer": "rgb(255, 235, 238)", // Fundo para erros
            "onErrorContainer": "rgb(127, 0, 0)", // Texto sobre o fundo de erro

            "background": "rgb(255, 255, 255)", // Fundo branco
            "onBackground": "rgb(29, 29, 29)", // Texto sobre o fundo
            "surface": "rgb(255, 255, 255)", // Superfície (como cartões e listas)
            "onSurface": "rgb(29, 29, 29)", // Texto sobre superfícies

            "surfaceVariant": "rgb(237, 237, 237)", // Variante de superfície para dividir seções
            "onSurfaceVariant": "rgb(74, 74, 74)", // Texto sobre a superfície variante
            "outline": "rgb(189, 189, 189)", // Linhas divisórias e bordas
            "outlineVariant": "rgb(224, 224, 224)", // Variante da outline

            "inverseSurface": "rgb(29, 29, 29)", // Superfície inversa
            "inverseOnSurface": "rgb(255, 255, 255)", // Texto sobre a superfície inversa
            "inversePrimary": "rgb(33, 150, 243)", // Azul mais escuro para modo inverso

            "elevation": {
                "level0": "transparent", // Transparente para elevações baixas
                "level1": "rgb(248, 248, 248)", // Elevação leve
                "level2": "rgb(244, 244, 244)",
                "level3": "rgb(240, 240, 240)",
                "level4": "rgb(236, 236, 236)",
                "level5": "rgb(232, 232, 232)"
            },
            "surfaceDisabled": "rgba(0, 0, 0, 0.12)",
            "onSurfaceDisabled": "rgba(0, 0, 0, 0.38)",
            "backdrop": "rgba(0, 0, 0, 0.4)"
        }
    };
    static dark = {
        "colors": {
            "primary": "rgb(129, 212, 250)", // Azul claro para o modo escuro
            "onPrimary": "rgb(0, 55, 107)", // Texto escuro sobre o primário claro
            "primaryContainer": "rgb(0, 70, 135)", // Azul mais escuro no container
            "onPrimaryContainer": "rgb(179, 229, 252)", // Texto sobre o container primário claro

            "secondary": "rgb(255, 138, 101)", // Laranja no modo escuro
            "onSecondary": "rgb(127, 0, 0)", // Texto mais escuro sobre o secundário
            "secondaryContainer": "rgb(191, 54, 12)", // Fundo mais escuro do secundário
            "onSecondaryContainer": "rgb(255, 204, 188)", // Texto sobre o secundário claro

            "tertiary": "rgb(255, 112, 67)", // Laranja forte no modo escuro
            "onTertiary": "rgb(255, 204, 188)", // Texto sobre o terciário
            "tertiaryContainer": "rgb(183, 28, 28)", // Fundo mais escuro do terciário
            "onTertiaryContainer": "rgb(255, 138, 101)", // Texto sobre o terciário claro

            "error": "rgb(255, 180, 171)", // Vermelho mais suave para erros no modo escuro
            "onError": "rgb(105, 0, 5)", // Texto sobre erros
            "errorContainer": "rgb(147, 0, 10)", // Fundo para erro
            "onErrorContainer": "rgb(255, 180, 171)", // Texto sobre o container de erro

            "background": "rgb(29, 29, 29)", // Fundo escuro
            "onBackground": "rgb(230, 230, 230)", // Texto claro no fundo escuro
            "surface": "rgb(29, 29, 29)", // Superfície no modo escuro
            "onSurface": "rgb(230, 230, 230)", // Texto sobre a superfície

            "surfaceVariant": "rgb(60, 60, 60)", // Variante de superfície para o modo escuro
            "onSurfaceVariant": "rgb(189, 189, 189)", // Texto sobre a variante da superfície
            "outline": "rgb(110, 110, 110)", // Linhas divisórias e bordas
            "outlineVariant": "rgb(85, 85, 85)", // Variante para outline

            "inverseSurface": "rgb(230, 230, 230)", // Superfície inversa no modo escuro
            "inverseOnSurface": "rgb(29, 29, 29)", // Texto escuro sobre a superfície inversa
            "inversePrimary": "rgb(129, 212, 250)", // Azul claro inverso no modo escuro

            "elevation": {
                "level0": "transparent", // Transparente para elevações baixas
                "level1": "rgb(39, 39, 39)", // Elevação leve
                "level2": "rgb(44, 44, 44)",
                "level3": "rgb(50, 50, 50)",
                "level4": "rgb(56, 56, 56)",
                "level5": "rgb(64, 64, 64)"
            },
            "surfaceDisabled": "rgba(230, 230, 230, 0.12)",
            "onSurfaceDisabled": "rgba(230, 230, 230, 0.38)",
            "backdrop": "rgba(0, 0, 0, 0.4)"
        }
    };

    static darkTheme = { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, ...NavigationDarkTheme, ...this.dark } }
    static lightTheme = { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...this.light } }
}

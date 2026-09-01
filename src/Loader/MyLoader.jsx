import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 1;   }
  50%      { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
`;

const BRAND = "#f86c6b";
const SIZE = 72;      // diamètre de l'anneau (px)
const THICKNESS = 6;  // épaisseur de l'anneau (px)

const MyLoader = () => (
  <Box
    role="status"
    aria-label="Chargement en cours"
    sx={{
      position: "fixed",
      inset: 0,
      display: "grid",
      placeItems: "center",
      bgcolor: "rgba(255, 255, 255, 0.82)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      zIndex: 9999,
    }}
  >
    <Box sx={{ position: "relative", width: SIZE, height: SIZE }}>
      {/* Piste de fond (statique) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `${THICKNESS}px solid rgba(248, 108, 107, 0.15)`,
        }}
      />

      {/* Anneau dégradé qui tourne */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `conic-gradient(from 90deg, rgba(248,108,107,0) 0deg, ${BRAND} 300deg, ${BRAND} 360deg)`,
          // Découpe le centre pour ne garder qu'un anneau
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${THICKNESS}px), #000 calc(100% - ${THICKNESS}px))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${THICKNESS}px), #000 calc(100% - ${THICKNESS}px))`,
          animation: `${spin} 0.85s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite`,
        }}
      >
        {/* Tête lumineuse au bout de l'arc */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: THICKNESS,
            height: THICKNESS,
            transform: "translateX(-50%)",
            borderRadius: "50%",
            bgcolor: BRAND,
            boxShadow: `0 0 10px 1px ${BRAND}`,
          }}
        />
      </Box>

      {/* Point central qui pulse */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: BRAND,
          animation: `${pulse} 1.2s ease-in-out infinite`,
        }}
      />
    </Box>
  </Box>
);

export default MyLoader;

# Chess puzzles and lessons for AstraAPP.
# Puzzles use standard FEN + list of best moves in UCI notation (e.g. "e2e4").
# Lessons are educational content with cosmic-themed narratives.

PUZZLES = [
    {
        "id": "nebula-01",
        "title": "Nebula Fork",
        "difficulty": "Beginner",
        "theme": "Fork",
        "rating": 900,
        "description": "White to move. A stellar knight can hit two targets — find the fork.",
        "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3",
        "player_color": "w",
        "solution": ["f3e5"],
        "explanation": "Nxe5 forks the pawn and prepares tactical pressure — a bright supernova of tempo.",
    },
    {
        "id": "orbit-02",
        "title": "Orbital Skewer",
        "difficulty": "Beginner",
        "theme": "Skewer",
        "rating": 1000,
        "description": "White to move. Line up two heavenly bodies along the same axis.",
        "fen": "4k3/8/8/8/8/4q3/8/R3K3 w Q - 0 1",
        "player_color": "w",
        "solution": ["a1a8"],
        "explanation": "Ra8+ skewers the king to the queen — gravity wins.",
    },
    {
        "id": "pulsar-03",
        "title": "Pulsar Pin",
        "difficulty": "Intermediate",
        "theme": "Pin",
        "rating": 1200,
        "description": "White to move. Freeze the enemy along the diagonal.",
        "fen": "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4",
        "player_color": "w",
        "solution": ["c1g5"],
        "explanation": "Bg5 pins the knight to the queen. The knight is frozen in a pulsar's grip.",
    },
    {
        "id": "supernova-04",
        "title": "Supernova Sacrifice",
        "difficulty": "Intermediate",
        "theme": "Sacrifice",
        "rating": 1400,
        "description": "White to move. Sometimes a star must explode to light the way to mate.",
        "fen": "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
        "player_color": "w",
        "solution": ["h5f7"],
        "explanation": "Qxf7# — the scholar's mate. A blinding flash ends the game.",
    },
    {
        "id": "quasar-05",
        "title": "Quasar Discovery",
        "difficulty": "Advanced",
        "theme": "Discovered Attack",
        "rating": 1600,
        "description": "White to move. Unveil the hidden power behind your piece.",
        "fen": "r3k2r/ppp2ppp/2n1b3/3q4/3P4/2N1BN2/PPP2PPP/R2QK2R w KQkq - 0 1",
        "player_color": "w",
        "solution": ["c3d5"],
        "explanation": "Nxd5 opens the bishop's diagonal while attacking the queen — a discovered supernova.",
    },
    {
        "id": "galaxy-06",
        "title": "Back-Rank Galaxy",
        "difficulty": "Beginner",
        "theme": "Back-rank Mate",
        "rating": 1100,
        "description": "White to move. The enemy king sits alone on the edge of the universe.",
        "fen": "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
        "player_color": "w",
        "solution": ["a1a8"],
        "explanation": "Ra8# — the king is boxed in by his own pawns. Elegant back-rank checkmate.",
    },
]


LESSONS = [
    {
        "id": "cosmic-openings",
        "title": "Cosmic Openings: The Big Bang",
        "level": "Beginner",
        "duration": "8 min",
        "summary": "Every game begins with a spark — learn how to seize the centre from move one.",
        "icon": "Sparkles",
        "sections": [
            {
                "heading": "The Centre is Everything",
                "body": "In the opening, the four central squares (d4, d5, e4, e5) are the sun of your solar system. Whoever controls them radiates power outward across the board. Play 1.e4 or 1.d4 to claim your star.",
            },
            {
                "heading": "Three Golden Principles",
                "body": "1) Occupy or influence the centre. 2) Develop your knights and bishops before your queen. 3) Castle early to shelter your king in a cosmic bunker.",
            },
            {
                "heading": "Example: Italian Game",
                "body": "1.e4 e5 2.Nf3 Nc6 3.Bc4 — a classic constellation. The bishop points at f7, the enemy's weakest star.",
                "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
            },
        ],
    },
    {
        "id": "gravity-tactics",
        "title": "Gravity Tactics: Forks & Pins",
        "level": "Beginner",
        "duration": "10 min",
        "summary": "Bend the enemy's pieces to your will using cosmic forks, pins, and skewers.",
        "icon": "Zap",
        "sections": [
            {
                "heading": "The Fork",
                "body": "A fork is a single piece attacking two enemy pieces at once. Knights are the tricksters of this universe — they can fork across colours and jump over obstacles.",
            },
            {
                "heading": "The Pin",
                "body": "A pin freezes an enemy piece because moving it would expose a more valuable piece behind. Bishops and rooks are the great pinners of the galaxy.",
            },
            {
                "heading": "The Skewer",
                "body": "Reverse of the pin: the more valuable piece is in front. Force it to move, then capture the piece behind — like using a black hole to sling one star aside and consume the other.",
            },
        ],
    },
    {
        "id": "stellar-endgames",
        "title": "Stellar Endgames: King & Pawn",
        "level": "Intermediate",
        "duration": "12 min",
        "summary": "In the endgame, the king becomes a star — active, powerful, and central.",
        "icon": "Crown",
        "sections": [
            {
                "heading": "The Opposition",
                "body": "When kings face each other with one square between, whichever side must move loses ground. Learn to seize the opposition and your king will guide pawns to promotion.",
            },
            {
                "heading": "The Square of the Pawn",
                "body": "To catch a passed pawn, your king must enter the imaginary square between the pawn and its promotion square. If you're inside, the pawn is doomed.",
            },
            {
                "heading": "Promotion",
                "body": "A pawn reaching the eighth rank is reborn as a queen — a supernova moment. Every endgame plan orbits around this transformation.",
            },
        ],
    },
    {
        "id": "nebula-strategy",
        "title": "Nebula Strategy: Pawn Structure",
        "level": "Intermediate",
        "duration": "15 min",
        "summary": "Pawns are the dust and gas of chess — their formation shapes the entire galaxy.",
        "icon": "Waypoints",
        "sections": [
            {
                "heading": "Pawn Chains",
                "body": "A diagonal chain of pawns is a defensive constellation. Attack the base of the chain — the anchor star — to collapse the whole structure.",
            },
            {
                "heading": "Isolated Pawns",
                "body": "A pawn with no neighbours is a wandering asteroid. It can be strong (mobile, controls squares) or weak (a target). Context is everything.",
            },
            {
                "heading": "Passed Pawns",
                "body": "A passed pawn has no enemy pawns blocking its path to promotion. Push it. Feed it. Escort it. Passed pawns must be pushed — like meteors chasing gravity.",
            },
        ],
    },
    {
        "id": "quasar-attacks",
        "title": "Quasar Attacks: Kingside Assault",
        "level": "Advanced",
        "duration": "18 min",
        "summary": "Launch a devastating attack on the enemy king — an interstellar bombardment.",
        "icon": "Flame",
        "sections": [
            {
                "heading": "Open Files & Diagonals",
                "body": "Rooks love open files like comets love empty space. Bishops love long diagonals. Aim them all at the enemy king's fortress.",
            },
            {
                "heading": "The Pawn Storm",
                "body": "When kings are on opposite sides, race your pawns forward like a meteor shower. h4-h5, g4-g5 — crack open the shelter.",
            },
            {
                "heading": "Sacrifices",
                "body": "The classical Bxh7+ (Greek Gift) or Nxf7 — a knight's kamikaze. When the king is exposed, material is secondary to tempo. Burn brightly.",
            },
        ],
    },
    {
        "id": "wormhole-defense",
        "title": "Wormhole Defense: Survival Tactics",
        "level": "Advanced",
        "duration": "14 min",
        "summary": "When under fire, know how to escape through cosmic wormholes.",
        "icon": "Shield",
        "sections": [
            {
                "heading": "Trade Attackers",
                "body": "The defender's best friend is a piece trade. Every attacker traded is one less star bombarding your position.",
            },
            {
                "heading": "Create Luft",
                "body": "'Luft' means air — a pawn move (h3, g3) that gives your king an escape square. Prevent back-rank mates before they happen.",
            },
            {
                "heading": "Counterattack",
                "body": "Sometimes the best defense is a devastating counter. If your king is safer than theirs, race forward.",
            },
        ],
    },
]

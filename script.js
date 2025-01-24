document.addEventListener('DOMContentLoaded', function () {
	initializeStyles();
	const keyInfoOverlay = createKeyInfoOverlay();
	document.body.appendChild(keyInfoOverlay);
	initializeKeyActions(keyInfoOverlay);
});

function initializeStyles() {
	const styleSheet = document.createElement('style');
	styleSheet.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .key-button {
            background: rgba(255, 255, 255, 0.07);
            border-radius: 12px;
            padding: 8px 16px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .key-button::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            border-radius: 14px;
            background: linear-gradient(45deg, #00d1ff, #00fff2, #00d1ff);
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
            z-index: -1;
            opacity: 0.3;
        }
        .key-button:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 5px 20px rgba(0, 209, 255, 0.2);
        }
        .action-text {
            position: relative;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .action-text:hover {
            transform: translateX(5px);
        }
        .action-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            background: linear-gradient(135deg, rgba(0, 209, 255, 0.1), rgba(0, 255, 242, 0.1));
            position: relative;
        }
        .action-icon::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            box-shadow: 0 0 15px rgba(0, 209, 255, 0.3);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .action-text:hover .action-icon::after {
            opacity: 1;
        }
    `;
	document.head.appendChild(styleSheet);
}

function createKeyInfoOverlay() {
	const keyInfoOverlay = document.createElement('div');
	keyInfoOverlay.id = 'keyInfoOverlay';
	Object.assign(keyInfoOverlay.style, {
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		width: '400px',
		padding: '30px',
		background:
			'linear-gradient(145deg, rgba(18, 18, 35, 0.98), rgba(28, 28, 45, 0.98))',
		color: 'white',
		borderRadius: '24px',
		boxShadow:
			'0 15px 50px rgba(0, 209, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
		fontFamily: `'Segoe UI', system-ui, sans-serif`,
		fontSize: '14px',
		display: 'none',
		zIndex: '9999',
		backdropFilter: 'blur(12px)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
		transform: 'translateY(20px) scale(0.98)',
		opacity: '0',
	});

	keyInfoOverlay.innerHTML = `
        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h3 style="margin: 0; font-size: 22px; background: linear-gradient(45deg, #00d1ff, #00fff2);
                           -webkit-background-clip: text; background-clip: text; color: transparent;
                           font-weight: 700; letter-spacing: 0.5px;">
                    キー対応表
                </h3>
                <div style="background: rgba(0, 209, 255, 0.1); padding: 6px 12px; border-radius: 12px;
                            font-size: 12px; color: #00d1ff; font-weight: 500;">
                    Shift で表示
                </div>
            </div>
            <div id="keys" style="display: grid; grid-template-columns: auto 1fr; gap: 16px; position: relative;">
            </div>
            <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <p style="margin: 0; font-size: 12px; color: #8a8a9b; display: flex; align-items: center; gap: 8px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d1ff" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16V12M12 8h.01"/>
                        </svg>
                        Shiftキーを離すと閉じます
                    </p>
                    <a href="https://instagram.com/3sshr_" 
                       target="_blank"
                       style="display: flex; align-items: center; gap: 8px; text-decoration: none; 
                              padding: 4px 12px; border-radius: 8px; 
                              background: linear-gradient(135deg, rgba(0, 209, 255, 0.1), rgba(0, 255, 242, 0.1));
                              transition: all 0.3s ease;">
                        <span style="font-size: 11px; color: #8a8a9b;">Produced by</span>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d1ff" stroke-width="2">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                            <span style="font-weight: 500; color: #00d1ff; font-size: 12px;">@3sshr_</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `;
	return keyInfoOverlay;
}

function initializeKeyActions(keyInfoOverlay) {
	const defaultKeyMap = [
		['1', 'select1', 'select'],
		['2', 'select2', 'select'],
		['3', 'select3', 'select'],
		['4', 'select4', 'select'],
		['Enter', 'next', 'next'],
		['Backspace', 'back', 'back'],
	];

	let keyMap = JSON.parse(localStorage.getItem('keyMap')) || defaultKeyMap;

	function keysUpdate(actions) {
		const keys = document.getElementById('keys');
		keys.innerHTML = actions
			.map(
				(item) =>
					`<div class="key-button">
                <span style="font-weight: 600; min-width: 80px;">${item[0]}</span>
            </div>
            <div class="action-text">
                <div class="action-icon">${getActionIcon(item[2])}</div>
                <span style="opacity: 0.9;">${actionReplace(item[1])}</span>
            </div>`
			)
			.join('');
	}

	function getActionIcon(type) {
		const iconColors = { select: '#00d1ff', next: '#00fff2', back: '#00d1ff' };
		const iconStyles = `stroke: ${iconColors[type]}; stroke-width: 2.5;`;
		switch (type) {
			case 'select':
				return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="${iconStyles}">
                    <path d="M20 6L9 17L4 12" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
			case 'next':
				return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="${iconStyles}">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
			case 'back':
				return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="${iconStyles}">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
		}
	}

	function actionReplace(action) {
		const actionsMap = {
			select1: 'アを選択',
			select2: 'イを選択',
			select3: 'ウを選択',
			select4: 'エを選択',
			next: '次の問題',
			back: '前のページ',
		};
		return actionsMap[action] || '';
	}

	keysUpdate(keyMap);
}


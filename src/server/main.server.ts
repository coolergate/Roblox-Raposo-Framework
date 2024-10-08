import { MarketplaceService, Players, ReplicatedStorage, StarterGui, StarterPlayer } from "@rbxts/services";
import { InitializeControllers, InitLifecycle } from "shared/core";
import { InitializeNetworking } from "shared/core/network";
import { InitializeEntitiesConstructor } from "shared/entities";
import { storage } from "shared/util/envfolders";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                    Logic                                   */
/* -------------------------------------------------------------------------- */

// Clean the workspace
for (const inst of StarterGui.GetChildren()) inst.Parent = storage.interface;
for (const inst of workspace.GetChildren())
	if (!inst.IsA("Terrain") && (inst.IsA("BasePart") || inst.IsA("Model"))) inst.Destroy();

workspace.Gravity = 60;

Players.CharacterAutoLoads = false;
StarterPlayer.DevComputerMovementMode = Enum.DevComputerMovementMode.Scriptable;
StarterPlayer.DevTouchMovementMode = Enum.DevTouchMovementMode.Scriptable;
StarterPlayer.EnableMouseLockOption = false;

game.BindToClose(() => {
	print(`Closing server...`);
	for (const player of Players.GetPlayers()) player.Destroy();
});

// Initialize controllers and networking
InitializeEntitiesConstructor();
InitializeNetworking();
InitializeControllers();

task.wait(1);

InitLifecycle();

task.wait(1);

// Allow the players to load
ReplicatedStorage.SetAttribute("Loaded", true);
